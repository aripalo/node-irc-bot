var isChannel = require('../modules/is-channel.js');
var validUrl = require('valid-url');
/*
 * URL-observer
 * -----------------------------------------------------------------------------
 * TODO: clean up & refactor
 */

module.exports = function(client, from, to, text, message) {

  var needle = require('needle');
  var cheerio = require('cheerio');
  var urlParser = require('url');
  var querystring = require('querystring');

  // http://stackoverflow.com/a/1500501
  // good enough regexp for us, since we also validate the url later with url-valid module
  function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return url;
    })
  }


  // get direct url from search result url
  function urlFromParams(url, key) {
    var u = urlParser.parse(url);
    return querystring.parse(u.query)[key];
  }

  function parseString(string) {

    var $ = this.$ = cheerio.load(string);
    var title = $('title').text().trim();

    return title;
  }

  if ( text.indexOf('http://') >= 0 | text.indexOf('https://') >= 0) {

    var options = {
      follow: true,
      headers: {
        'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1677.0 Safari/537.36"
      }
    }

    var url = urlify(text);

    if (validUrl.isUri(url)){
      needle.get(url, options, function(error, response, body) {

        if (!error && response.statusCode == 200) {
          var title = parseString(body);
          var sendTo = from; // send privately
          if (isChannel(to)) {
            sendTo = to; // send publicly
          }
          client.say(sendTo, title);
        }

      });
    } else {

    }

  }
};

