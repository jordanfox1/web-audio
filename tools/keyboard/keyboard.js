import { createGainSlider } from "../../plugins/volumeControl";
import { createVibratoSlider } from "../../plugins/vibrato";

export const showKeyboard = () => {
  const header = document.createElement("h1");
  header.innerHTML = "HELLO KEYS";
  document.body.appendChild(header);
  createGainSlider(primaryGainControl);
  createKeyboard();
};

// Global variables - these will be used by the functions pulled in from other files, and also the funcntions declared in here
const audioContext = new AudioContext();
console.log(audioContext.sampleRate); //48000
const buffer = audioContext.createBuffer(
  2,
  audioContext.sampleRate * 1,
  audioContext.sampleRate
);
const channelData = buffer.getChannelData(0);

// volumeController
const primaryGainControl = audioContext.createGain();
primaryGainControl.gain.setValueAtTime(0.05, 0); //setValueAtTime lets us set the value of the gain node at a specific time in the lifecycle of the audioContext
primaryGainControl.connect(audioContext.destination);

const createKeyboard = () => {
  // Now connect the audio node to another node which is the audio destination node
  // The destination node is attached directly to the audio context and
  // it represents whatever hardware is configured to play audio on the user's device (WOW)

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
  ];

  notes.forEach((note) => {
    const noteButton = document.createElement("button");
    noteButton.innerText = note.name;
    noteButton.addEventListener("click", () => {
      const osc = audioContext.createOscillator();
      osc.type = "square";
      osc.frequency.setValueAtTime(note.frequency, audioContext.currentTime);
      
      //Vibrato
      const vibrato = audioContext.createOscillator();
      //frequency of vibrato osc will determine the speed of vibrato
      vibrato.frequency.setValueAtTime(40, 0);
      // gain determines intesity of vibrato
      const vibratoGain = audioContext.createGain();
      vibratoGain.gain.setValueAtTime(20, 0);
      vibrato.connect(vibratoGain);
      vibratoGain.connect(osc.frequency);
      vibrato.start();

      //Volume envelope
      const attack = 0.2;
      const decay = 0.3;
      const sustain = 0.7;
      const release = 0.1;

      const now = audioContext.currentTime;
      const noteGain = audioContext.createGain();
      noteGain.gain.setValueAtTime(0, 0);
      noteGain.gain.linearRampToValueAtTime(1, now + attack);
      noteGain.gain.linearRampToValueAtTime(sustain, now + attack + decay);
      noteGain.gain.setValueAtTime(sustain, now + 1 - release);
      noteGain.gain.linearRampToValueAtTime(0, now + 1);
      osc.connect(noteGain);
      noteGain.connect(primaryGainControl);

      // osc.connect(primaryGainControl)
      osc.start();
      osc.stop(audioContext.currentTime + 1);
    });

    document.body.appendChild(noteButton);
  });
};
