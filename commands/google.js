/*
 * Google command
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
    return 'no keyword given, mate';
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

     $('.g').each(function(i, el) {

      el = $(el);

      var row = {
        Title: el.find('.l').text(),
        URL: el.find('.l').attr('href')
      };

      results.push(row);

    }.bind(this));

    return results;
  }

  needle.get('http://www.google.com/custom?q='+querystring.escape(q), defaultHeaders, function(error, response, body) {
    var results = parseString(body);

    var sendTo = from; // send privately
    if (to.indexOf('#') > -1) {
      sendTo = to; // send publicly
    }

    client.say(sendTo,
      'Here are the top 3 results for the search "'+q+'": '
      +'\n1: '+results[0].URL
      +'\n2: '+results[1].URL
      +'\n3: '+results[2].URL
      +'\nMore results at: http://www.google.com/search?q='+querystring.escape(q)
      );

  });

};

