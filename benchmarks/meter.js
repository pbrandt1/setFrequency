var setFrequency = require('../index.js');
var microtime = require('microtime');
var fs = require('fs');
var moment = require('moment');

var log = new (function(name) {
  var l = fs.createWriteStream(name);
  this.log = function() {
    l.write(Array.prototype.join.call(arguments, '\t'));
    l.write('\n');
  };
  this.close = function() {
    l.close();
  };
  return this;
})('sweep' + moment().format('YYYY-MM-DD-hhmmss') + '.log');

log.log('hz', 'observed');

var duration = 5; //seconds

var meter = function(hz, cb) {
  var count = 0;
  var startTime = microtime.now();

  var endTime = duration*1000000 + startTime;

  var a = setFrequency(function() {
    count++;
  }, hz);


  setTimeout(function() {

    a.stop();

    endTime = microtime.now();
    var hz_actual = count/(endTime - startTime)*1000000;
    cb(hz, hz_actual);

  }, duration*1000);
};

var f = function(hz) {
  setTimeout(function() {
    meter(hz, function(hz, actual) {
      log.log(hz, actual);
    });
    if (hz < 100000) {
      // log scale: f(Math.pow(2, Math.log(hz)/Math.log(2) + 1));

      // go logarithmic for high numbers
      if (hz >= 100) {
        f(Math.pow(2,Math.log(hz)/Math.log(2) +.25));
      } else {
        f(hz + 11);
      }
    } else {
      log.close();
    }
  }, duration*1000 + 100);
};
f(1);

