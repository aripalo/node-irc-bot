var fs = require('fs');

/*
 * String to hold !help command answer
 * -----------------------------------------------------------------------------
 */
module.exports = {

  string: "",

  toString: function() {
    return this.string;
  },

  buildString: function() {

    this.string = 'The available commands are: ';//reset the string
    this.string += '\n!help (this command you just ran)';
    this.string += '!reload (admin only)';
    this.string += ', !quit (admin only)';

    fs.readdirSync('./commands/').forEach(function (file) {
      this.string += ', !'+file.replace(/\.js$/, '');
    });

  }

}
