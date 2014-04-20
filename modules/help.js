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
    this.string += '!reload';
    this.string += ', !quit';
    this.string += ', !join';
    this.string += ', !part';
    this.string += ', !say';
    this.string += ', !kick';
    this.string += ', !ban';
    this.string += ', !unban';
    this.string += ', !topic';
    this.string += ', !op';
    this.string += ', !deop';
    this.string += ', !mode';


    fs.readdirSync('./commands/').forEach(function (file) {
      this.string += ', !'+file.replace(/\.js$/, '');
    });

  }

}
