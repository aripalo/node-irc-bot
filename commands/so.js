/*
 * Stackoverflow command
 * -----------------------------------------------------------------------------
 * mostly stolen from https://www.npmjs.org/package/google-search-parser-4hype
 *
 */

module.exports = function(client, from, to, text, message) {

  var needle = require('needle');
  var cheerio = require('cheerio');
  var urlParser = require('url');
  var querystring = require('querystring');

  var q = text.split(/ (.+)/)[1];

  if (!q || q.length == 0) {
    return 'No keyword given, can\'t really do a Stackoverflow search with that. Try \'!stackoverflow NodeJS\'';
  }

  defaultHeaders = {
    'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1677.0 Safari/537.36"
  };

  // get direct url from search result url
  function urlFromParams(url, key) {
    var u = urlParser.parse(url);
    return querystring.parse(u.query)[key];
  }

  function parseString(string) {

    var $ = this.$ = cheerio.load(string);
    var results = [];

    $('.search-result').each(function(i, el) {

      el = $(el);

      var row = {
        Title: el.find('.result-link a').text(),
        URL: 'http://stackoverflow.com'+el.find('.result-link a').attr('href')
      };

      results.push(row);

    }.bind(this));

    return results;
  }

  needle.get('http://stackoverflow.com/search?q='+querystring.escape(q), defaultHeaders, function(error, response, body) {
    var results = parseString(body);

    var sendTo = from; // send privately
    if (to.indexOf('#') > -1) {
      sendTo = to; // send publicly
    }

    client.say(sendTo,
      'Here are the top 3 Stackoverflow results for the search "'+q+'": '
      +'\n1: '+results[0].URL
      +'\n2: '+results[1].URL
      +'\n3: '+results[2].URL
      +'\nMore results at: http://stackoverflow.com/search?q='+querystring.escape(q)
      );

  });

};

