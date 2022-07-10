export function createVibratoSlider(osc) {
   const audioContext = new AudioContext

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
}
