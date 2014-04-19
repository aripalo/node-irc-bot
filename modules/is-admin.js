var config  = require('../config.json');

/*
 * Helper to check if "someone" is actually a bot admin
 * -----------------------------------------------------------------------------
 */
module.exports = function(someone) {

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
