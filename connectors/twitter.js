var request = require('request');
var Q = require('q');
var util = require('util');

function twitter(url) {
  var deferred = Q.defer();

  request({
    url: util.format('http://cdn.api.twitter.com/1/urls/count.json?url=%s', url),
    json: true
  }, function(err, response) {
    deferred.resolve(response.body.count);
  });

  return deferred.promise;
}

module.exports = twitter;