var fs = require('fs');
var help = require('./help.js');
var isChannel = require('./is-channel.js');
var clearModuleCaches = require('./clear-module-caches.js');
var isAdmin = require('./is-admin.js');

/*
 * Command handler
 * -----------------------------------------------------------------------------
 *
 * TODO:
 * - refactor the decision point (in the of this function)
 * - refactor the internal commands to use only arguments
 */
module.exports = function(client, from, to, text, message) {

  var internalCommand = {};// lookup table for internal commands

  var opts = {
    command: String(text.split(' ')[0]).replace('!', '').trim(),
    argument: text.substring(String(text.split(' ')[0]).length).trim(),
    messageToSend: ''
  }

  /*
   *
   * ---------------------------------------------------------------------------
   * basically stolen from:
   * http://fahad19.tumblr.com/post/39920378753/running-an-irc-bot-with-nodejs-locally
   */
  function externalCommand(opts) {
    if (fs.existsSync('./commands/' + opts.command + '.js')) { // check if we have an command file
      var output = require('../commands/' + opts.command + '.js')(client, from, to, text, message);
      if (output) {
        client.say(sendTo, output);
      }
    } else {
      client.say(sendTo, 'unknown command');
    }
  };

  /*
   * Standard IRC /join
   * ---------------------------------------------------------------------------
   */
  internalCommand.join = function(opts) {
    if (isAdmin(message.prefix)) {
      client.join(opts.argument);
    }
  };

  /*
   * Standard IRC /part
   * ---------------------------------------------------------------------------
   */
  internalCommand.part = function(opts) {
    if (isAdmin(message.prefix)) {
      if (text.split(' ')[1] != undefined && text.split(' ')[1].indexOf('#') > -1) {
        client.part(text.split(' ')[1]);
      } else {
        client.part(sendTo);
      }
    }
  };

  /*
   * Standard IRC /kick
   * ---------------------------------------------------------------------------
   */
  internalCommand.kick = function(opts) {
    if (isAdmin(message.prefix)) {
      client.send('KICK', sendTo, opts.argument.split(' ')[0], opts.argument.split(' ')[1] || '');
    }
  };

  /*
   * Convenience method for banning
   * ---------------------------------------------------------------------------
   */
  internalCommand.ban = function(opts) {
    if (isAdmin(message.prefix)) {
      client.send('MODE', sendTo, '+b', opts.argument);
    }
  };

  /*
   * Convenience method for unbanning
   * ---------------------------------------------------------------------------
   */
  internalCommand.unban = function(opts) {
    if (isAdmin(message.prefix)) {
      client.send('MODE', sendTo, '-b', opts.argument);
    }
  };

  /*
   * Speak
   * ---------------------------------------------------------------------------
   */
  internalCommand.say = function(opts) {
    if (isAdmin(message.prefix)) {
      if (isChannel(opts.argument)) {
        messageToSend = opts.argument.substring( String(opts.argument.trim().split(' ')[0]).length+1 ).trim();
      } else {
        messageToSend = opts.argument;
      }
      client.say(sendTo, messageToSend);
    }
  };

  /*
   * Standard IRC /topic setter
   * ---------------------------------------------------------------------------
   */
  internalCommand.topic = function(opts) {
    if (isAdmin(message.prefix) && opts.argument.length > 0) {
      client.send('TOPIC', sendTo, opts.argument);
    }
  };

  /*
   * Standard IRC /op convenience method for mode +o
   * ---------------------------------------------------------------------------
   */
  internalCommand.op = function(opts) {
    if (isAdmin(message.prefix)) {
      client.send('MODE', sendTo, '+o', opts.argument);
    }
  };

  /*
   * Standard IRC /deop convenience method for mode -o
   * ---------------------------------------------------------------------------
   */
  internalCommand.deop = function(opts) {
    if (isAdmin(message.prefix)) {
      client.send('MODE', sendTo, '-o', opts.argument);
    }
  };

  /*
   * Standard IRC /mode
   * ---------------------------------------------------------------------------
   */
  internalCommand.mode = function(opts) {
    if (isAdmin(message.prefix)) {
      client.send('MODE', String(text.split(' ')[1]), String(text.split(' ')[2]), String(text.split(' ')[3]));
    }
  };

  /*
   * Standard IRC /quit
   * ---------------------------------------------------------------------------
   */
  internalCommand.quit = function(opts) {
    if (isAdmin(message.prefix)) {
      client.disconnect("As you wish m'lord!", function(){
        process.exit();
      });
    } else {
      client.say(sendTo, 'Sorry mate, only bot admin can do that!');
    }
  };

  /*
   * Bot: Reload commands/observers/greetings/auto-ops
   * ---------------------------------------------------------------------------
   */
  internalCommand.reload = function(opts) {
    if (isAdmin(message.prefix)) {
      client.say(sendTo, clearModuleCaches());
    } else {
      client.say(sendTo, 'Sorry mate, only bot admin can do that!');
    }
  };

  /*
   * Bot: list available commands
   * ---------------------------------------------------------------------------
   */
  internalCommand.help = function(opts) {
    client.say(sendTo, help.toString());
  };

  /*
   * Decision point
   * ---------------------------------------------------------------------------
   * TODO: refactor
   */
  if (text && text.length > 2 && text[0] == '!') {

    var sendTo = from; // send privately

    if (isChannel(to)) {
      sendTo = to; // send publicly
    }

    // test if we have an internal/core command for it, if not try external
    if (typeof internalCommand[opts.command]  === 'function') {
      internalCommand[opts.command](opts);
    } else {
      externalCommand(opts);
    }
  }
};
