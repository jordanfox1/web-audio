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

// create some UI
const button = document.createElement('button')
button.innerText = 'WHITE NOISE'
button.addEventListener("click", () => {
    // We have to create a buffer source which is an audio node which handles playing the buffer
    const whiteNoiseSource = audioContext.createBufferSource()
    // assign the buffer source to our whitenoise buffer
    whiteNoiseSource.buffer = buffer
    // then connect all our nodes to that gain node, and then connect the gain node to the detination node
    whiteNoiseSource.connect(primaryGainControl)
    whiteNoiseSource.start()
})
document.body.appendChild(button)
// we can only play a source node once

const highPassFilter = audioContext.createBiquadFilter()
highPassFilter.type = "highpass"
highPassFilter.frequency.value = 2000
highPassFilter.connect(primaryGainControl)

const snareButton = document.createElement("button")
snareButton.innerText = "SNARE"
snareButton.addEventListener("click", () => {
        const whiteNoiseSource = audioContext.createBufferSource()
        const snareGain = audioContext.createGain()
        snareGain.gain.setValueAtTime(1, 0)
        snareGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3)

        whiteNoiseSource.buffer = buffer
        whiteNoiseSource.connect(snareGain)
        snareGain.connect(highPassFilter)
        whiteNoiseSource.start()
})
document.body.appendChild(snareButton)

const kickButton = document.createElement("button")
kickButton.innerText = "KICK"
kickButton.addEventListener("click", () => {

    const kickOsc = audioContext.createOscillator()
    kickOsc.type = "sine"
    kickOsc.frequency.setValueAtTime(200, 0)
    kickOsc.frequency.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.6 )

    //set gain node to create volume envelope for kick
    const kickGain = audioContext.createGain()
    kickGain.gain.setValueAtTime(1, 0)
    kickGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5)

    kickOsc.connect(kickGain)
    kickGain.connect(primaryGainControl)
    kickOsc.start()
    // audio context keeps precise time, so we can control how long our osc plays
    kickOsc.stop(audioContext.currentTime + 0.5) //plays for 0.5 seconds
})
document.body.appendChild(kickButton)

const notes = [
    { name: "c", frequency: 261.63 },
    { name: "c#", frequency: 277.18 },
    { name: "d", frequency: 293.66 },
    { name: "d#", frequency: 311.13 },
    { name: "e", frequency: 329.63 },
    { name: "f", frequency: 349.23 },
    { name: "f#", frequency: 369.99 },
    { name: "g", frequency: 392.0 },
    { name: "g#", frequency: 415.3 },
    { name: "a", frequency: 440.0 },
    { name: "a#", frequency: 466.16 },
    { name: "b", frequency: 493.88 },
]

document.body.appendChild(document.createElement('br'))

notes.forEach(note => {
    const noteButton = document.createElement("button")
    noteButton.innerText = note.name
    noteButton.addEventListener("click", () => {
        const osc = audioContext.createOscillator()
        osc.type = "square"
        osc.frequency.setValueAtTime(note.frequency, audioContext.currentTime)

        //Vibrato
        const vibrato = audioContext.createOscillator()
        //frequensy of vibrato osc will determine the speed of vibrato
        vibrato.frequency.setValueAtTime(40, 0)
        // gain determines intesity of vibrato
        const vibratoGain = audioContext.createGain()
        vibratoGain.gain.setValueAtTime(20, 0)
        vibrato.connect(vibratoGain)
        vibratoGain.connect(osc.frequency)
        vibrato.start()
        

        //Volume envelope
        const attack = 0.2
        const decay = 0.3
        const sustain = 0.7
        const release = 0.1
    
        const now = audioContext.currentTime
        const noteGain = audioContext.createGain()
        noteGain.gain.setValueAtTime(0, 0)
        noteGain.gain.linearRampToValueAtTime(1, now + attack)
        noteGain.gain.linearRampToValueAtTime(sustain, now + attack + decay )
        noteGain.gain.setValueAtTime(sustain, now + 1 - release)
        noteGain.gain.linearRampToValueAtTime(0, now + 1)
        osc.connect(noteGain)
        noteGain.connect(primaryGainControl)

        // osc.connect(primaryGainControl)
        osc.start()
        osc.stop(audioContext.currentTime + 1)
    })

    document.body.appendChild(noteButton)
});