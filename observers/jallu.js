/*
 * Jallu-observer
 * -----------------------------------------------------------------------------
 * Notices when people are talking about "jallu", the great liquour from Finland,
 * cut brandy: http://en.wikipedia.org/wiki/Cut_brandy
 *
 */

module.exports = function(client, from, to, text, message) {

  var lowerCasedText = text.toLowerCase();
  var jalluWords = [
    'jallu',
    'jaloviina',
    'jalmari'
  ]

  if (new RegExp(jalluWords.join("|")).test(lowerCasedText)) {

    var jalluTexts = [
      'Jallu on mielipidevaikuttajien juoma!',
      'Sen yhden tähden!',
      'https://www.youtube.com/watch?v=YYv4yadRexY',
      'Jallu on nautiskelujuoma.',
      'vai jallua tekee mieli? Hyvä.'
    ];

    return from+': '+jalluTexts[Math.floor(Math.random()*jalluTexts.length)];

  }


};
