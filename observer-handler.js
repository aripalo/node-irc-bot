var fs = require('fs');
var isChannel = require('./is-channel.js');

/*
 * Observer handler
 * -----------------------------------------------------------------------------
 */
module.exports = function(client, from, to, text, message) {

  if (text && text.length > 2 && text[0] != '!') {
    var sendTo = from; // send privately
    if (isChannel(to)) {
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
