/**
 * Web Audio API Sound & Music Synthesizer for Diwali Moments
 * 100% self-contained, zero external mp3 dependencies, works offline and respects browser autoplay.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isMusicPlaying = false;
    this.musicGain = null;
    this.ambientOscillators = [];
    this.ambientInterval = null;
    this.masterGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = this.isMuted ? 0 : 0.6;
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain) {
      const targetGain = this.isMuted ? 0 : 0.6;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(muted ? 0 : 0.6, this.ctx.currentTime, 0.05);
    }
  }

  /**
   * Starts ambient meditative festive drone with gentle Indian tanpura/flute harmonic chords
   */
  startFestiveMusic() {
    this.init();
    if (this.isMusicPlaying || !this.ctx) return;
    this.isMusicPlaying = true;

    // Music gain node
    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.musicGain.gain.exponentialRampToValueAtTime(0.35, this.ctx.currentTime + 3.0);
    this.musicGain.connect(this.masterGain);

    // Warm Tanpura base drone frequencies (Root D: 146.8Hz, Fifth A: 220Hz, Octave D: 293.6Hz, Maj Third F#: 369.9Hz)
    const droneFreqs = [146.83, 220.0, 293.66, 369.99];
    
    droneFreqs.forEach((freq, index) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

      osc.type = index % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Low pass filter to make it sound warm and organic
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800 + index * 200, this.ctx.currentTime);

      // Subtle LFO for breathing effect
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.15 + index * 0.08, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      lfo.connect(lfoGain);

      gain.gain.setValueAtTime(0.08 / (index + 1), this.ctx.currentTime);
      lfoGain.connect(gain.gain);

      if (panner) {
        panner.pan.setValueAtTime((index % 2 === 0 ? -0.3 : 0.3), this.ctx.currentTime);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(panner);
        panner.connect(this.musicGain);
      } else {
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.musicGain);
      }

      osc.start();
      lfo.start();
      this.ambientOscillators.push({ osc, lfo, gain, filter });
    });

    // Gentle periodic bell/chime arpeggios that play randomly in the background (Raga Bhairav / Yaman scale)
    const scaleNotes = [293.66, 329.63, 369.99, 440.0, 493.88, 587.33, 659.25, 739.99, 880.0];
    this.ambientInterval = setInterval(() => {
      if (!this.isMusicPlaying || this.isMuted) return;
      if (Math.random() > 0.4) {
        const note = scaleNotes[Math.floor(Math.random() * scaleNotes.length)];
        this.playSoftChime(note);
      }
    }, 2800);
  }

  stopFestiveMusic() {
    if (!this.isMusicPlaying) return;
    this.isMusicPlaying = false;
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
    if (this.musicGain && this.ctx) {
      this.musicGain.gain.setTargetAtTime(0.001, this.ctx.currentTime, 0.8);
      setTimeout(() => {
        this.ambientOscillators.forEach(({ osc, lfo }) => {
          try {
            osc.stop();
            lfo.stop();
          } catch {
            // ignore
          }
        });
        this.ambientOscillators = [];
      }, 1000);
    }
  }

  toggleMusic() {
    if (this.isMusicPlaying) {
      this.stopFestiveMusic();
      return false;
    } else {
      this.startFestiveMusic();
      return true;
    }
  }

  playSoftChime(freq = 587.33) {
    if (!this.ctx || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.06, this.ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 2.5);
    } catch {
      // AudioContext interrupted
    }
  }

  /**
   * Sound effect when clicking interactive Diya
   */
  playDiyaLight() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;

      // Bell chime
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(659.25, now); // E5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.3); // A5

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 1.2);

      // Warm flame whoosh (filtered white noise)
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(1200, now + 0.3);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.08, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      whiteNoise.start(now);
    } catch {
      // AudioContext interrupted
    }
  }

  /**
   * Sound effect for gift box opening / unwrap
   */
  playGiftUnwrap() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      // Magical ascending sparkle arpeggio
      const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.5]; // A Major Pentatonic
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0.001, now + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, now + i * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.8);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.8);
      });
    } catch {
      // AudioContext interrupted
    }
  }

  /**
   * Sound effect for button taps and subtle sparkles
   */
  playSparkle() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.15); // E6

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.1, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch {
      // AudioContext interrupted
    }
  }

  /**
   * Sound effect for firework launch & burst
   */
  playFirework() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;

      // Low boom
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.4);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.5);

      // Crackle noise
      const bufferSize = this.ctx.sampleRate * 0.3;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.setValueAtTime(800, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.09, now + 0.05);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      noise.start(now + 0.05);
    } catch {
      // AudioContext interrupted
    }
  }
}

export const sound = new SoundEngine();
export default sound;

