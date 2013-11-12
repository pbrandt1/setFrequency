var setFrequency = require('../');

describe('a setFrequency object', function() {
  it('should have all the following methods and properties', function() {
    var f = setFrequency(function(){}, 1);
    f.should.have.property('start');
    f.should.have.property('stop');
    f.should.have.property('frequency');
    f.should.have.property('callback');
    f.should.have.property('running');
  });
  it('should run at almost exactly the given frequency for low frequencies', function(done) {
    var count = 0;
    var countTo = 100;
    var frequency = 100;
    var startTime = +new Date();
    var stopTime;
    var f = setFrequency(function() {
      count++;
      if (count === countTo) {
        stopTime = +new Date();
        this.stop();
        var duration = (stopTime - startTime)/1000;
        var measuredFrequency = count/duration;
        console.log('\nfrequency should be ' + frequency);
        console.log('ran ' + count + ' tests in ' + duration + ' seconds for a frequency of ' + measuredFrequency);
        Math.abs((measuredFrequency - frequency)/frequency).should.be.below(0.05); // Within 5%
        done();
      }
    }, frequency);
  });
  it('should run at approximately the given frequency for high frequencies', function(done) {
    var count = 0;
    var countTo = 1000;
    var frequency = 1000;
    var startTime = +new Date();
    var stopTime;
    var f = setFrequency(function() {
      count++;
      if (count === countTo) {
        stopTime = +new Date();
        this.stop();
        var duration = (stopTime - startTime)/1000;
        var measuredFrequency = count/duration;
        console.log('\nfrequency should be ' + frequency);
        console.log('ran ' + count + ' tests in ' + duration + ' seconds for a frequency of ' + measuredFrequency);
        Math.abs((measuredFrequency - frequency)/frequency).should.be.below(0.1); // Within 10%
        done();
      }
    }, frequency);
  });
});
