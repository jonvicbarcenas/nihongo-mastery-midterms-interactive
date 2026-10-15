// Web Speech API wrapper for Japanese Text-to-Speech

class SpeechManager {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.voice = null;
    this.enabled = true;
    this.initVoices();
  }

  initVoices() {
    if (!this.synth) return;
    const updateVoice = () => {
      const voices = this.synth.getVoices();
      // Look for ja-JP voice, prioritizing Google Japanese or Microsoft Japanese
      this.voice = voices.find(v => v.lang.startsWith('ja') || v.lang.includes('JP')) ||
                   voices.find(v => v.name.toLowerCase().includes('japan')) || null;
    };

    updateVoice();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = updateVoice;
    }
  }

  speak(text, rate = 0.9, pitch = 1.0) {
    if (!this.enabled || !this.synth || !text) return;

    try {
      this.synth.cancel(); // Stop any pending speech
      const cleanText = text.replace(/[\[\]\(\)\/]/g, ' ').trim();
      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ja-JP';
      if (this.voice) {
        utterance.voice = this.voice;
      }
      utterance.rate = rate;
      utterance.pitch = pitch;

      this.synth.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  setEnabled(val) {
    this.enabled = val;
    if (!val) this.stop();
  }
}

export const speech = new SpeechManager();
