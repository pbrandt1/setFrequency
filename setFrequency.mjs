/**
 * Runs the specified function at the specified frequency, up to 1000 Hz
 *
 * @param callback <Function> callback function
 * @param frequency <Number> Up to 1000 Hz
 * @returns {setFrequency}
 */
export default function setFrequency(callback, frequency) {
  // maximum fidelity, kick off right away, then do sanity checks and finally setup the loop
  const start = Date.now()
  if (typeof callback === 'function') {
    callback()
  } else {
    console.warn('setFrequency called without a callback function. callback was type ' + typeof callback)
    return
  }

  if (!(frequency > 0)) {
    console.warn('setFrequency called with frequency ' + frequency + '. Ran callback only once and never again.')
    return
  }

  // the function works by determining the time in the future to call the callback, doing a setInterval, and course-correcting as necessary
  var intervalMilliseconds = 1000 / frequency;
  var step = 1
  var nextTick = start + intervalMilliseconds
  var running = true

  // Called every interval
  function tic() {
    // check if stop() has been called
    if (!running) {
      return
    }

    // call the callback
    callback()

    // update the times
    step++
    nextTick = start + step * intervalMilliseconds // target the next exact time, though the callback time may have not been exact

    // aim to hit the next tick boundary exactly
    setTimeout(tic, nextTick - Date.now())
  }

  // Set up the loop
  setTimeout(tic, nextTick - Date.now())

  // Provide a means for stopping
  function stop() {
    running = false;
  }

  return {
    stop: stop
  }
};
