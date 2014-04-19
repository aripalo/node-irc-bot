var fs = require('fs');

/*
 * String to hold !help command answer
 * -----------------------------------------------------------------------------
 */
module.exports = {

  string: "",

  buildString: function() {

    console.log('help called...');

    helpString = 'The available commands are: ';//reset the string
    helpString += '\n!help (this command you just ran)';
    helpString += '!reload (admin only)';
    helpString += ', !quit (admin only)';

    fs.readdirSync('./commands/').forEach(function (file) {
      helpString += ', !'+file.replace(/\.js$/, '');
    });

  }

}
