# setFrequency
just like setInterval but based on frequency instead of period.  Does not work in the browser yet.
## How to use
```
npm install setfrequency
```

```js
var setFrequency = require('setfrequency');
var timer = setFrequency(function() {
    console.log('callback');
}, 10);
...
// can change the frequency any time
timer.frequency = 20;

// can change the callback any time
timer.callback = function() { console.log('second callback') };
```

## Performance
Looking to improve performance here.

![alt text](https://github.com/pbrandt1/setFrequency/raw/master/plot.png "Frequency fidelity plot")


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
