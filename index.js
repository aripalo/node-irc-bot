/*
 * NodeJS IRC bot
 * =============================================================================
 * by @aripalo
 *
 */



var fs = require('fs');
var irc = require("irc");
var config  = require('./config.json');


/*
 * String to hold !help command answer
 * -----------------------------------------------------------------------------
 */

var helpString = "";

function buildHelpString() {

  helpString = "";

  helpString = 'The available commands are: ';

  helpString += '\n!help (this command you just ran)';
  helpString += '!reload (admin only)';
  helpString += ', !quit (admin only)';

  fs.readdirSync('./commands/').forEach(function (file) {
    helpString += ', !'+file.replace(/\.js$/, '');
  });

};


/*
 * Helper to check if "someone" is actually a bot admin
 * -----------------------------------------------------------------------------
 */
function isAdmin(someone) {

  if (Array.isArray(config.admins) && config.admins.some(function(value) { return someone.indexOf(value) >= 0; })) {
    // config.admin is array and there's at least one match
    return true;
  } else if (typeof config.admins == "string" && config.admins == someone) {
    // config.admin is a string and it is a match
    return true;
  } else {
    // not an admin or no admins specified in config
    return false;
  }
};


/*
 * Helper for checking if a nich is on channel's auto-op list
 * -----------------------------------------------------------------------------
 */
function isInAutoop(channel, nick) {

  var autoop;

  if (!fs.existsSync('./autoop.json')) { return false; }

  autoop  = require('./autoop.json');

  if (autoop == undefined) { return false; }

  if (Array.isArray(autoop[channel]) && autoop[channel].some(function(value) { return nick.toLowerCase().indexOf(value.toLowerCase()) >= 0; })) {
    // autoop[channel] is array and there's at least one match
    return true;
  } else if (typeof autoop[channel] == "string" && autoop[channel].toLowerCase() == nick.toLowerCase()) {
    // autoop[channel] is a string and it is a match
    return true;
  } else {
    // no matches
    return false;
  }

};

/*
 * Helper for reloading modules
 * -----------------------------------------------------------------------------
 * http://stackoverflow.com/a/15666221
 *
 * This function doesn't "reload" anything,
 * it just clears stuff from the require.cache so that other functions
 * will actually get the changed modules from the disk
 */
function clearModuleCaches() {

  // delete stuff from require.cache
  fs.readdirSync('./commands/').forEach(function (file) {
    delete require.cache[require.resolve('./commands/'+file)];
  });

  fs.readdirSync('./observers/').forEach(function (file) {
    delete require.cache[require.resolve('./observers/'+file)];
  });

  delete require.cache[require.resolve('./autoop.json')];
  delete require.cache[require.resolve('./greetings.json')];

  // build the help string again
  buildHelpString();

  // returns a message for the IRC bot to send to the admin user who called !reload
  return 'Commands, observeres, greeting lists and auto-op lists are now reloaded!';

};


/*
 * Command handler
 * -----------------------------------------------------------------------------
 * stolen from:
 * http://fahad19.tumblr.com/post/39920378753/running-an-irc-bot-with-nodejs-locally
 */
function commandHandler(client, from, to, text, message) {
  if (text && text.length > 2 && text[0] == '!') {
    var sendTo = from; // send privately
    if (to.indexOf('#') > -1) {
      sendTo = to; // send publicly
    }

    var command = String(text.split(' ')[0]).replace('!', '');

    if (command.trim() == 'help') {

      client.say(sendTo, helpString);

    } else if (command.trim() == 'reload') {

      if (isAdmin(message.prefix)) {
        client.say(sendTo, clearModuleCaches());
      } else {
        client.say(sendTo, 'Sorry mate, only bot admin can do that!');
      }

    } else if (command.trim() == "quit") {

      if (isAdmin(message.prefix)) {
        client.disconnect("As you wish m'lord!", function(){
          process.exit();
        });
      } else {
        client.say(sendTo, 'Sorry mate, only bot admin can do that!');
      }

    } else if (fs.existsSync('./commands/' + command + '.js')) { // check if we have an command file
      var output = require('./commands/' + command + '.js')(client, from, to, text, message);
      if (output) {
        client.say(sendTo, output);
      }
    } else {
      client.say(sendTo, 'unknown command');
    }
  }
};


/*
 * Observer handler
 * -----------------------------------------------------------------------------
 */
function observerHandler(client, from, to, text, message) {

  if (text && text.length > 2 && text[0] != '!') {
    var sendTo = from; // send privately
    if (to.indexOf('#') > -1) {
      sendTo = to; // send publicly
    }

    fs.readdirSync('./observers/').forEach(function (file) {
      var output = require('./observers/' + file)(client, from, to, text, message);
      if (output) {
        client.say(sendTo, output);
      }
    });

  }
};


/*
 * Instatiate the client and add listeners
 * -----------------------------------------------------------------------------
 */
var client = new irc.Client(config.server, config.userName, config);


// Check when registered to IRC server
client.addListener("registered", function() {
  console.log("Bot is now registered with the server "+config.server);
  buildHelpString();
});


// Error handler
client.addListener('error', function(message) {
  console.log('error: ', message);
});


// Listen for messages
client.addListener('message', function(from, to, text, message) {

  //handles commands starting with "!""
  commandHandler(client, from, to, text, message);

  //listens for certain keywords on conversatios etc and acts on them
  observerHandler(client, from, to, text, message);

});


// Listen for joins
client.addListener("join", function(channel, nick, message) {

  var greetings;

  if (fs.existsSync('./greetings.json')) {
    greetings = require('./greetings.json');
  }

  if (nick != config.userName) {
    // do stuff when other people join

    // if greetins.json configured, then greet the newly joined user
    if (greetings != undefined && typeof greetings[channel] == "string" && greetings[channel].length > 1) {
      client.say(channel, nick+': '+greetings[channel]);
    }

    // auto-op bot admin and optionally configured users on autoop.json
    if (isAdmin(message.prefix) || isInAutoop(channel, nick)) {
      client.send('MODE', channel, '+o', nick);
    }

  } else {
    // do stuff when the bot itself joins...
  }
});
