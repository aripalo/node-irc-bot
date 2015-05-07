var config  = require('../config/config.json');

/*
 * Helper to check if "someone" is actually a bot admin
 * -----------------------------------------------------------------------------
 */
module.exports = function(string) {

  var channelPrefixes = config.channelPrefixes.split('');

  return channelPrefixes.some(function(value) {
    return string.trim().indexOf(value) == 0;
  });

}
