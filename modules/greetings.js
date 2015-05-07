var config  = require('../config/config.json');
var fs = require('fs');
/*
 *
 * -----------------------------------------------------------------------------
 */

module.exports = function(client, channel, nick, message) {

  var greetings;

  if (fs.existsSync('../config/greetings.json')) {
    greetings = require('../config/greetings.json');

    // if greetins.json configured, then greet the newly joined user
    if (nick != config.userName, greetings != undefined && typeof greetings[channel] == "string" && greetings[channel].length > 1) {
      client.say(channel, nick+': '+greetings[channel]);
    }

  }


}
