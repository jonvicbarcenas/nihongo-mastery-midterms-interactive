// Web Audio API Sound Effects Synthesizer

class SoundEffects {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  getAudioContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playTone(freq, type, duration, gainStart = 0.15, gainEnd = 0.001) {
    if (!this.enabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(gainStart, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(gainEnd, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio might be blocked until user interaction
    }
  }

  // Chime when an answer or stroke is correct
  correct() {
    const ctx = this.getAudioContext();
    if (!ctx || !this.enabled) return;

    // Pleasant major third chord arpeggio
    this.playTone(523.25, 'sine', 0.15, 0.12); // C5
    setTimeout(() => this.playTone(659.25, 'sine', 0.18, 0.12), 80); // E5
    setTimeout(() => this.playTone(783.99, 'sine', 0.35, 0.15), 160); // G5
  }

  // Stroke completed in drawing canvas
  strokeDone() {
    this.playTone(880, 'sine', 0.12, 0.08);
  }

  // Soft click / tap sound
  click() {
    this.playTone(600, 'triangle', 0.05, 0.04);
  }

  // Error buzz
  incorrect() {
    const ctx = this.getAudioContext();
    if (!ctx || !this.enabled) return;

    this.playTone(220, 'sawtooth', 0.2, 0.1);
    setTimeout(() => this.playTone(180, 'sawtooth', 0.25, 0.1), 100);
  }

  // Celebratory fanfare when lesson is completed
  fanfare() {
    const notes = [
      { f: 523.25, d: 0.12, wait: 0 },
      { f: 659.25, d: 0.12, wait: 120 },
      { f: 783.99, d: 0.14, wait: 240 },
      { f: 1046.50, d: 0.4, wait: 360 }
    ];
    notes.forEach(n => {
      setTimeout(() => this.playTone(n.f, 'triangle', n.d, 0.15), n.wait);
    });
  }

  setEnabled(val) {
    this.enabled = val;
  }
}

export const soundFx = new SoundEffects();
