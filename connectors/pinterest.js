var request = require('request');
var Q = require('q');
var util = require('util');

function pinterest(url) {
  var deferred = Q.defer();

  request({
    url: util.format('http://api.pinterest.com/v1/urls/count.json?callback=&url=%s', url),
    json: true
  }, function(err, response) {
    var count = (null, eval)(response.body).count;
    
    if (count === '-') {
      count = 0;
    }

    deferred.resolve(count);
  });

  return deferred.promise;
}

module.exports = pinterest;