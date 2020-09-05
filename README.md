# setFrequency

just like setInterval but based on frequency instead of period. Maximum 1000 Hz.

```sh
npm install setfrequency
```

```js
import setFrequency from 'setfrequency';

const frameRate = 24
const renderLoop = setFrequency(render, frameRate);

// you can stop if you want
document.querySelector('.pause').addEventListener('click', () => renderLoop.stop())
```
