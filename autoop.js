var fs = require('fs');
var isAdmin = require('./is-admin.js');
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


module.exports = function(client, channel, nick, message) {

  // auto-op bot admin and optionally configured users on autoop.json
  if (isAdmin(message.prefix) || isInAutoop(channel, nick)) {
    client.send('MODE', channel, '+o', nick);
  }


}
