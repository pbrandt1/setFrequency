/**
 * Created the setFrequency function
 *
 * @param callback <Function>
 * @param frequency <Number>
 * @returns {setFrequency}
 */
var setFrequency = function(callback, frequency) {
  var t;
  var me = this;
  me.running = true;
  me.callback = callback;
  me.frequency = frequency;

  /**
   * Main loop
   */
  var loop = function() {
    t = setTimeout(function() {
      loop();
      me.callback();
    }, Math.round(1000/me.frequency));
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