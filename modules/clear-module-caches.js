var fs = require('fs');
var help = require('./help.js');

/*
 * Helper for reloading modules
 * -----------------------------------------------------------------------------
 * http://stackoverflow.com/a/15666221
 *
 * This function doesn't "reload" anything,
 * it just clears stuff from the require.cache so that other functions
 * will actually get the changed modules from the disk
 */
module.exports = function() {
  console.log("Reloading ...")

  // delete stuff from require.cache
  fs.readdirSync('./commands/').forEach(function (file) {
    delete require.cache[require.resolve('../commands/'+file)];
  });

  fs.readdirSync('./observers/').forEach(function (file) {
    delete require.cache[require.resolve('../observers/'+file)];
  });

  try {
    delete require.cache[require.resolve('../config/autoop.json')];
  }catch(e){
    console.error("Reload: autoop.json not in cache")
  }  

  try {
    delete require.cache[require.resolve('../config/greetings.json')];
  }catch(e){
    console.error("Reload: greeting.json not in cache")
  }  
 
  // build the help string again
  help.buildString();

  // a message for the IRC bot to send to the admin user who called !reload
  return 'Commands, observeres, greetings & auto-op lists are now reloaded!';

  console.log("Reloading done!")
};
