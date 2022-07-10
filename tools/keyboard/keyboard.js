import { createGainSlider } from "../../plugins/volumeControl";
import { createVibratoSlider } from "../../plugins/vibrato";

export const showKeyboard = () => {
  const header = document.createElement("h1");
  header.innerHTML = "HELLO KEYS";
  document.body.appendChild(header);
  createGainSlider(primaryGainControl);
  createSineKeyboard();
  createModKeyboard();
  createPluckKeyboard();
  createPiano()
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

const createModKeyboard = () => {
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

const createSineKeyboard = () => {
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
      osc.type = "sine";
      osc.frequency.setValueAtTime(note.frequency, audioContext.currentTime);

      //Vibrato
      //   const vibrato = audioContext.createOscillator();
      //   //frequency of vibrato osc will determine the speed of vibrato
      //   vibrato.frequency.setValueAtTime(40, 0);
      //   // gain determines intesity of vibrato
      //   const vibratoGain = audioContext.createGain();
      //   vibratoGain.gain.setValueAtTime(20, 0);
      //   vibrato.connect(vibratoGain);
      //   vibratoGain.connect(osc.frequency);
      //   vibrato.start();

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

const createPluckKeyboard = () => {
  // Now connect the audio node to another node which is the audio destination node
  // The destination node is attached directly to the audio context and
  // it represents whatever hardware is configured to play audio on the user's device (WOW)

  const notes = [
    { name: "c", frequency: 261.63, cssClass: "white-key" },
    { name: "c#", frequency: 277.18, cssClass: "black-key" },
    { name: "d", frequency: 293.66, cssClass: "white-key" },
    { name: "d#", frequency: 311.13, cssClass: "black-key" },
    { name: "e", frequency: 329.63, cssClass: "white-key" },
    { name: "f", frequency: 349.23, cssClass: "white-key" },
    { name: "f#", frequency: 369.99, cssClass: "black-key" },
    { name: "g", frequency: 392.0, cssClass: "white-key" },
    { name: "g#", frequency: 415.3, cssClass: "black-key" },
    { name: "a", frequency: 440.0, cssClass: "white-key" },
    { name: "a#", frequency: 466.16, cssClass: "black-key" },
    { name: "b", frequency: 493.88, cssClass: "white-key" },
  ];

  notes.forEach((note) => {
    const noteButton = document.createElement("button");
    noteButton.innerText = note.name;
    noteButton.addEventListener("click", () => {
      const osc = audioContext.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(note.frequency, audioContext.currentTime);

      //Vibrato
      //   const vibrato = audioContext.createOscillator();
      //   //frequency of vibrato osc will determine the speed of vibrato
      //   vibrato.frequency.setValueAtTime(40, 0);
      //   // gain determines intesity of vibrato
      //   const vibratoGain = audioContext.createGain();
      //   vibratoGain.gain.setValueAtTime(20, 0);
      //   vibrato.connect(vibratoGain);
      //   vibratoGain.connect(osc.frequency);
      //   vibrato.start();

      //Volume envelope
      const attack = 0;
      const decay = 0.1;
      const sustain = 0;
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
    noteButton.classList.add(note.cssClass);
  });
};

function createPiano() {
    let numberOfOctaves = 2;
    const octaveWidth = 280;
    const pianoSVG = `<svg 
        width = 50%    
        version="1.1" 
        xmlns="http://www.w3.org/2000/svg" 
        xmlns:xlink="http://www.w3.org/1999/xlink" 
        viewBox="0 0 ${numberOfOctaves * octaveWidth} 400">
        <g id="piano-keyboard">
        </g>
    </svg>`;

    const piano = document.querySelector("#piano")

    const pianoApp = {
        setupPaino() {
            // Add main SVG to piano div
            piano.innerHTML = pianoSVG
            const pianoKeyboard = document.querySelector("#piano-keyboard")

            //createOctaves
            for (let i = 0; i < numberOfOctaves; i++) {
                 const octave = utils.createSVGElement("g")
                 octave.classList.add("octave")
                 octave.setAttribute("transform", `translate(${ i * octaveWidth }, 0)`)

                 let whiteKeyXPosition = 0
                 // Add white Keys to ocatve
                 for (let i = 0; i < 7; i++) {
                    const whiteKey = utils.createSVGElement("rect")
                    whiteKey.classList.add("white-key")
                    whiteKey.setAttribute("x", whiteKeyXPosition)
                    whiteKey.setAttribute("width", 40)
                    whiteKey.setAttribute("height", 200)
                    whiteKeyXPosition += 40
                    octave.appendChild(whiteKey);            
                 }

                 let blackKeyXPosition = 30
                 // Add black keys to octave
                 for (let i = 0; i < 5; i++) {
                    const blackKey = utils.createSVGElement("rect")
                    blackKey.classList.add("black-key")
                    blackKey.setAttribute("x", blackKeyXPosition)
                    blackKey.setAttribute("width", 20)
                    blackKey.setAttribute("height", 125)

                    if (i === 1) {
                        blackKeyXPosition += 80
                    } else {
                        blackKeyXPosition += 40
                    }

                    octave.appendChild(blackKey);
                 }

                 pianoKeyboard.appendChild(octave)
            }
        }
    }

    const utils = {
        createSVGElement(el) {
            const element = document.createElementNS("http://www.w3.org/2000/svg", el)
            return element
        }
    }
    pianoApp.setupPaino()
    // const octaveKeys = `
    // <rect class="piano-key white-key" x="0" y="0" width="40" height="200" ></rect>
    // <rect class="piano-key white-key" x="40" y="0" width="40" height="200" ></rect>
    // <rect class="piano-key white-key" x="80" y="0" width="40" height="200" ></rect>
    // <rect class="piano-key white-key" x="120" y="0" width="40" height="200"></rect>
    // <rect class="piano-key white-key" x="160" y="0" width="40" height="200" ></rect>
    // <rect class="piano-key white-key" x="200" y="0" width="40" height="200" ></rect>
    // <rect class="piano-key white-key" x="240" y="0" width="40" height="200" ></rect>
    // <rect class="piano-key black-key" x="30" y="0" width="20" height="125" ></rect>
    // <rect class="piano-key black-key" x="70" y="0" width="20" height="125" ></rect>
    // <rect class="piano-key black-key" x="150" y="0" width="20" height="125" ></rect>
    // <rect class="piano-key black-key" x="190" y="0" width="20" height="125" ></rect>
    // <rect class="piano-key black-key" x="230" y="0" width="20" height="125" ></rect>
    // `
    // const piano = document.querySelector('#piano')
    // piano.innerHTML = pianoSVG
    // const pianoKeyboard = document.querySelector("#piano-keyboard")

    // for (let i = 0; i < numberOfOctaves; i++) {
    //     const octave = document.createElementNS("http://www.w3.org/2000/svg", "g") //createElementNS is used to create an SVG namespace
    //     octave.classList.add("octave")
    //     octave.setAttribute("transform", `translate(${ i * octaveWidth }, 0)`)
    //     octave.innerHTML = octaveKeys
    //     pianoKeyboard.appendChild(octave)
    // }    
}

