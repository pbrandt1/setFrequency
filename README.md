# setFrequency
just like setInterval but based on frequency instead of period.  Works in node or the browser.
## How to use
```
npm install setInterval
```

```js
var setFrequency = require('simplematrix');
var timer = setFrequency(function() {
    console.log('callback');
}, 10);
...
// can change the frequency any time
timer.frequency = 20;

// can change the callback any time
timer.callback = function() { console.log('second callback') };
```

## Properties
### frequency
Measured in Hz.  You can set this to change the frequency.
### callback
Can be anything.  You can change this midstream.
### running
True/False; Whether you timer is running or paused.

## Methods
### start
Starts or restarts the timer.  You may want to use start() after changing a low frequency, because changes in frequency aren't picked up until the next loop of the timer.
### stop
Stops the timer.
