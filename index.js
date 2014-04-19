var fs = require('fs');
var irc = require("irc");
var config  = require('./config.json');
var commandHandler = require('./command-handler.js');
var observerHandler = require('./observer-handler.js');
var help = require('./help.js');
var autoop = require('./autoop.js');
var greetings = require('./greetings.js');



/*
 * NodeJS IRC bot
 * =============================================================================
 * by @aripalo
 *
 */


/*
 * Instatiate the client and add listeners
 * -----------------------------------------------------------------------------
 */
var client = new irc.Client(config.server, config.userName, config);


// Check when registered to IRC server
client.addListener("registered", function() {
  console.log("Bot is now registered with the server "+config.server);
  help.buildString();
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

  greetings(client, channel, nick, message);
  autoop(client, channel, nick, message);

});
