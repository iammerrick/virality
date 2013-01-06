var request = require('request');
var Q = require('q');
var util = require('util');

function facebook(url) {
  var deferred = Q.defer();

  request({
    url: util.format('http://graph.facebook.com/%s', url),
    json: true
  }, function(err, response) {
    var count = 0;
    if (response.body.shares) {
      count = response.body.shares;
    }
    deferred.resolve(count);
  });

  return deferred.promise;
}

module.exports = facebook;