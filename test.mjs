
import setFrequency from './setFrequency.mjs'

const timestamps = []

const frequency = process.argv[2]
const n = process.argv[3]

var j = 0;
console.log(`TESTING FREQUENCY ${frequency} for ${n} SAMPLES, taking ${n / frequency} seconds`)

const now = Date.now()
var timer = setFrequency(() => {
    timestamps.push(Date.now())
    j++
    process.stdout.write(j + ' ')
    if (j >= n) {
        const finishTime = timestamps.slice(-1)[0]
        timer.stop()
        var expectedFinishTime = now + (n - 1) * 1000 / frequency
        const drift = finishTime - expectedFinishTime

        // post-process
        const interval_lengths = []
        var sum = 0
        for (let i = 1; i < timestamps.length; i++) {
            var interval_length = timestamps[i] - timestamps[i-1]
            interval_lengths.push(interval_length)
            sum = sum + interval_length
        }

        const mean = sum / interval_lengths.length

        // std
        var sum_squares = 0
        for (var i = 0; i < interval_lengths.length; i++) {
            sum_squares = sum_squares + Math.pow(interval_lengths[i] - mean, 2)
        }
        var std = Math.sqrt(1 / (interval_lengths.length - 1) * sum_squares)

        console.log('\n\nresults:')
        console.log(`expected ${1000 / frequency}`)
        console.log(`mean ${mean}`)
        console.log(`std ${std}`)
        console.log(`expected finish time: ${expectedFinishTime}`)
        console.log(`actual finish time: ${finishTime}`)
        console.log(`drift ms ${drift}`)
        // console.log(interval_lengths)
        if (Math.abs(drift) > std * 3) {
            throw new Error('DRIFT TOO HIGH, should almost always be < 3 sigma of the individual interval length')
        }
    }
}, frequency)
