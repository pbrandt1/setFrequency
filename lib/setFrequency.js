var microtime = require('microtime');

/**
 * Create the setFrequency function
 *
 * @param callback <Function>
 * @param frequency <Number>
 * @returns {setFrequency}
 */
var setFrequency = function(callback, frequency) {
  debugger;
  var t;
  var me = {};

  me.running = true;
  me.callback = callback;
  me.frequency = frequency;

  var loopLength = Math.floor(1000000/me.frequency); // Microseconds

  var msDelay = Math.floor(1000/me.frequency);

  var nextLoop = 0;

  /**
   * Main loop
   */
  var loop = function() {
    nextLoop = microtime.now() + loopLength - 100;  // add 0.1 milliseconds compensation
    t = setTimeout(function() {
      innerLoop();
    }, msDelay);
  };

  var innerLoop = function() {
    setImmediate(function() {
      if (microtime.now() < nextLoop) {
        innerLoop();
      } else {
        me.callback();
        loop();
      }
    });
  };

  /**
   * Starts or restarts the timer
   */
  me.start = function() {
    if (me.running) {
      me.stop();
    }
    loop();
    me.running = true;
  };

  /**
   * Stops the timer
   */
  me.stop = function() {
    if (!me.running) {
      if (window && window.clearTimeout()) {
        window.clearTimeout(t);
        me.running = false;
      } else if (clearTimeout) {
        clearTimeout(t);
        me.running = false;
      }
    }
  };

  me.start();

  return me;
};



module.exports = exports = setFrequency;