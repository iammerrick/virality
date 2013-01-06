var request = require('request');
var Q = require('q');
var connectors = require('./connectors');
var fs = require('fs');
var util = require('util');
require('colors');

function banner() {
  return fs.readFileSync(__dirname+'/resources/banner.txt', 'utf8');
}

function virality(url) {
  Q.spread([
    connectors.facebook(url),
    connectors.twitter(url),
    connectors.pinterest(url),
    connectors.linkedin(url)
  ], function(facebookScore, twitterScore, pinterestScore, linkedinScore){
    var total = Array.prototype.slice.call(arguments).reduce(function(score, memo){
      return score + memo;
    }, 0);

    console.log(banner());
    console.log(util.format('     Total:'.bold +' %s'.blue, total));
    console.log(util.format('  Facebook:'.bold +' %s'.blue, facebookScore));
    console.log(util.format('   Twitter:'.bold +' %s'.blue, twitterScore));
    console.log(util.format(' Pinterest:'.bold +' %s'.blue, pinterestScore));
    console.log(util.format('  LinkedIn:'.bold +' %s'.blue, linkedinScore));
  });  
}

module.exports = virality;