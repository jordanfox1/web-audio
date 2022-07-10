import { showKeyboard } from "./tools/keyboard/keyboard"
import { showDrums } from "./tools/drums/drums"
import { showStudio } from "./tools/studio";

const location = window.location.pathname;
if (location.length == 0) {
    location = '/'
}

switch (location) {
    case '/studio':
        showStudio()
        break;
    case '/keyboard':
        showKeyboard()
        break;
    case '/drums':
        showDrums()
        break;
    default:
        showStudio()
        break;
}

const audioContext = new AudioContext()
console.log(audioContext.sampleRate) //48000

const buffer = audioContext.createBuffer(
    1, 
    audioContext.sampleRate * 1,
    audioContext.sampleRate
)

const channelData = buffer.getChannelData(0)

// mutate the channelData directly to create a signal
// mapping a random value over the signal to create whitenoise
for (let i = 0; i < buffer.length; i++ ) {
    channelData[i] = Math.random() * 2 - 1
}

// Now connect the audio node to another node which is the audio destination node
// The destination node is attached directly to the audio context and 
    // it represents whatever hardware is configured to play auudio on the user's device (WOW) 

// first create a gain node to turn down the volume so you don't blow up your speakers
const primaryGainControl = audioContext.createGain()
primaryGainControl.gain.setValueAtTime(0.05, 0) //setValueAtTime lets us set the value of the gain node at a specific time in the lifecycle of the audioContext
primaryGainControl.connect(audioContext.destination)

// // create some UI
// const button = document.createElement('button')
// button.innerText = 'WHITE NOISE'
// button.addEventListener("click", () => {
//     // We have to create a buffer source which is an audio node which handles playing the buffer
//     const whiteNoiseSource = audioContext.createBufferSource()
//     // assign the buffer source to our whitenoise buffer
//     whiteNoiseSource.buffer = buffer
//     // then connect all our nodes to that gain node, and then connect the gain node to the detination node
//     whiteNoiseSource.connect(primaryGainControl)
//     whiteNoiseSource.start()
// })
// document.body.appendChild(button)
// // we can only play a source node once

// const highPassFilter = audioContext.createBiquadFilter()
// highPassFilter.type = "highpass"
// highPassFilter.frequency.value = 2000
// highPassFilter.connect(primaryGainControl)

// const snareButton = document.createElement("button")
// snareButton.innerText = "SNARE"
// snareButton.addEventListener("click", () => {
//         const whiteNoiseSource = audioContext.createBufferSource()
//         const snareGain = audioContext.createGain()
//         snareGain.gain.setValueAtTime(1, 0)
//         snareGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3)

//         whiteNoiseSource.buffer = buffer
//         whiteNoiseSource.connect(snareGain)
//         snareGain.connect(highPassFilter)
//         whiteNoiseSource.start()
// })
// document.body.appendChild(snareButton)

// const kickButton = document.createElement("button")
// kickButton.innerText = "KICK"
// kickButton.addEventListener("click", () => {

//     const kickOsc = audioContext.createOscillator()
//     kickOsc.type = "sine"
//     kickOsc.frequency.setValueAtTime(200, 0)
//     kickOsc.frequency.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.6 )

//     //set gain node to create volume envelope for kick
//     const kickGain = audioContext.createGain()
//     kickGain.gain.setValueAtTime(1, 0)
//     kickGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5)

//     kickOsc.connect(kickGain)
//     kickGain.connect(primaryGainControl)
//     kickOsc.start()
//     // audio context keeps precise time, so we can control how long our osc plays
//     kickOsc.stop(audioContext.currentTime + 0.5) //plays for 0.5 seconds
// })
// document.body.appendChild(kickButton)

document.body.appendChild(document.createElement('br'))
