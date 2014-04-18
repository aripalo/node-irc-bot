var fs = require('fs');
var irc = require("irc");
var config  = require('./config.json');


// helper for checking if someone is a bot admin
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
}



// command handler
// http://fahad19.tumblr.com/post/39920378753/running-an-irc-bot-with-nodejs-locally
function commandHandler(client, from, to, text, message) {
  if (text && text.length > 2 && text[0] == '!') {
    var sendTo = from; // send privately
    if (to.indexOf('#') > -1) {
      sendTo = to; // send publicly
    }

    var command = String(text.split(' ')[0]).replace('!', '');

    if (command.trim() == "reload") {

      if (isAdmin(message.prefix)) {

        fs.readdirSync('./commands/').forEach(function (file) {
          delete require.cache[require.resolve('./commands/'+file)];
        });
        fs.readdirSync('./listeners/').forEach(function (file) {
          delete require.cache[require.resolve('./listeners/'+file)];
        });
        client.say(sendTo, 'Commands and listeneres are now reloaded!');

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
      var commandFunc = require('./commands/' + command + '.js');
      var output = commandFunc(client, from, to, text, message);
      if (output) {
        client.say(sendTo, output);
      }
    } else {
      client.say(sendTo, 'unknown command');
    }
  }
};

// listener handler
function listenerHandler(client, from, to, text, message) {

  if (text && text.length > 2 && text[0] != '!') {
    var sendTo = from; // send privately
    if (to.indexOf('#') > -1) {
      sendTo = to; // send publicly
    }

    fs.readdirSync('./listeners/').forEach(function (file) {
      var output = require('./listeners/' + file)(client, from, to, text, message);
      if (output) {
        client.say(sendTo, output);
      }
    });

  }
};


// Instatiate the client
var client = new irc.Client(config.server, config.userName, config);

// Check when registered to IRC server
client.addListener("registered", function() {
  console.log("Bot is now registered with the server "+config.server);
});

// Error handler
client.addListener('error', function(message) {
  console.log('error: ', message);
});

// Listen for messages
client.addListener('message', function(from, to, text, message) {
  commandHandler(client, from, to, text, message);
  listenerHandler(client, from, to, text, message);
});




// Listen for joins
client.addListener("join", function(channel, who) {

  if (who != config.userName) {
    // do stuff when other people join
    client.say(channel, who + " WADDUP?!");
  } else {
    // do stuff when the bot itself joins...
  }
});
