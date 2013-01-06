var request = require('request');
var Q = require('q');
var util = require('util');

function facebook(url) {
  var deferred = Q.defer();

  request({
    url: util.format(
      'https://graph.facebook.com/fql?q=SELECT like_count, share_count FROM link_stat WHERE url = "%s"',
        url
      ),
    json: true
  }, function(err, response, parsed) {
    var count = 0;
    if (parsed.data[0].share_count && parsed.data[0].like_count) {
      count = parsed.data[0].share_count + parsed.data[0].like_count;
    }
    deferred.resolve(count);
  });

  return deferred.promise;
}

module.exports = facebook;