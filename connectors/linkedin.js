var request = require('request');
var Q = require('q');
var util = require('util');

function linkedin(url) {
  var deferred = Q.defer();

  request({
    url: util.format('http://www.linkedin.com/countserv/count/share?url=%s&format=json', url),
    json: true
  }, function(err, response) {
    deferred.resolve(response.body.count);
  });

  return deferred.promise;
}

module.exports = linkedin;