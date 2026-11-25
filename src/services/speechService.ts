/**
 * Speech Synthesis Service for Parth Ahuja's AI Persona
 * Handles natural speech generation, markdown text sanitization,
 * voice selection, and audio wave simulation for reactive visualizers.
 */

export interface SpeechOptions {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: unknown) => void;
  onWaveUpdate?: (level: number) => void;
}

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private waveInterval: number | null = null;
  private isSpeakingInternal = false;
  private isMutedInternal = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      // Preload voices
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => {
          this.getBestVoice();
        };
      }
    }
  }

  public isSupported(): boolean {
    return this.synth !== null;
  }

  public isSpeaking(): boolean {
    return this.isSpeakingInternal && !!this.synth?.speaking;
  }

  public isMuted(): boolean {
    return this.isMutedInternal;
  }

  public setMuted(muted: boolean): void {
    this.isMutedInternal = muted;
    if (muted && this.isSpeaking()) {
      this.stop();
    }
  }

  /**
   * Sanitizes rich markdown, code blocks, technical URLs, and bullet points
   * into clean, smooth, spoken conversational English.
   */
  public cleanTextForSpeech(rawText: string): string {
    if (!rawText) return '';

    let text = rawText;

    // 1. Remove code blocks entirely
    text = text.replace(/```[\s\S]*?```/g, ' [code block omitted] ');

    // 2. Remove inline code
    text = text.replace(/`([^`]+)`/g, '$1');

    // 3. Remove URLs and markdown links [label](url) -> label
    text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    text = text.replace(/https?:\/\/\S+/g, '');

    // 4. Remove markdown headers (#, ##, ###)
    text = text.replace(/#{1,6}\s+/g, '');

    // 5. Remove bold & italic markdown asterisks & underscores
    text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
    text = text.replace(/\*([^*]+)\*/g, '$1');
    text = text.replace(/__([^_]+)__/g, '$1');
    text = text.replace(/_([^_]+)_/g, '$1');

    // 6. Convert bullet points and numbered lists to natural speech pauses
    text = text.replace(/^\s*[-*•]\s+/gm, '. ');
    text = text.replace(/^\s*\d+\.\s+/gm, '. ');

    // 7. Expand or clarify common acronyms for natural pronunciation
    text = text.replace(/\bRAG\b/g, 'RAG');
    text = text.replace(/\bLLM\b/g, 'L-L-M');
    text = text.replace(/\bAPI\b/g, 'A-P-I');
    text = text.replace(/\bUI\b/g, 'U-I');
    text = text.replace(/\bUX\b/g, 'U-X');
    text = text.replace(/\bAI\b/g, 'A-I');
    text = text.replace(/\bBOM\b/g, 'Bill of Materials');
    text = text.replace(/\bJAGSoM\b/g, 'Jag-Som');

    // 8. Collapse whitespace and excess punctuation
    text = text.replace(/\s+/g, ' ').trim();
    text = text.replace(/\.{2,}/g, '.');

    return text;
  }

  /**
   * Selects the highest quality natural human voice available in the client browser.
   */
  public getBestVoice(): SpeechSynthesisVoice | null {
    if (!this.synth) return null;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return null;

    // Preferred natural English voices
    const preferredNames = [
      'Google US English',
      'Google UK English Female',
      'Google UK English Male',
      'Microsoft David',
      'Microsoft Mark',
      'Microsoft Christopher Online (Natural)',
      'Microsoft Guy Online (Natural)',
      'Samantha',
      'Daniel',
      'Alex',
      'Fred'
    ];

    for (const name of preferredNames) {
      const found = voices.find((v) => v.name.includes(name));
      if (found) return found;
    }

    // Fallback: any standard en-US or en voice
    const enUs = voices.find((v) => v.lang === 'en-US' || v.lang === 'en_US');
    if (enUs) return enUs;

    const enAny = voices.find((v) => v.lang.startsWith('en'));
    if (enAny) return enAny;

    return voices[0] || null;
  }

  /**
   * Speaks the provided text with natural pitch, pace, and animated wave updates.
   */
  public speak(rawText: string, options: SpeechOptions = {}): void {
    if (!this.synth || this.isMutedInternal) {
      options.onEnd?.();
      return;
    }

    // Stop any ongoing speech
    this.stop();

    const spokenText = this.cleanTextForSpeech(rawText);
    if (!spokenText.trim()) {
      options.onEnd?.();
      return;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(spokenText);
      const voice = this.getBestVoice();
      if (voice) {
        utterance.voice = voice;
      }

      utterance.pitch = 1.0;
      utterance.rate = 1.02; // Crisp, confident cadence
      utterance.volume = 1.0;

      utterance.onstart = () => {
        this.isSpeakingInternal = true;
        this.startWaveSimulation(options.onWaveUpdate);
        options.onStart?.();
      };

      utterance.onend = () => {
        this.isSpeakingInternal = false;
        this.stopWaveSimulation(options.onWaveUpdate);
        this.currentUtterance = null;
        options.onEnd?.();
      };

      utterance.onerror = (e) => {
        this.isSpeakingInternal = false;
        this.stopWaveSimulation(options.onWaveUpdate);
        this.currentUtterance = null;
        options.onError?.(e);
      };

      this.currentUtterance = utterance;

      // Chrome speech timeout workaround (keepalive ping)
      const keepAliveTimer = setInterval(() => {
        if (!this.synth || !this.isSpeakingInternal) {
          clearInterval(keepAliveTimer);
          return;
        }
        this.synth.pause();
        this.synth.resume();
      }, 10000);

      this.synth.speak(utterance);
    } catch (err) {
      this.isSpeakingInternal = false;
      this.stopWaveSimulation(options.onWaveUpdate);
      options.onError?.(err);
    }
  }

  /**
   * Immediately halts active speech.
   */
  public stop(): void {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {}
    }
    this.isSpeakingInternal = false;
    this.currentUtterance = null;
    this.stopWaveSimulation();
  }

  /**
   * Audio wave oscillation simulator for reactive particle and equalizer animations.
   */
  private startWaveSimulation(onWaveUpdate?: (level: number) => void): void {
    this.stopWaveSimulation();
    if (!onWaveUpdate) return;

    let phase = 0;
    this.waveInterval = window.setInterval(() => {
      phase += 0.25;
      // Multi-harmonic modulation simulating human vocal cadence
      const harmonic1 = Math.sin(phase) * 0.4;
      const harmonic2 = Math.sin(phase * 2.3) * 0.3;
      const harmonic3 = Math.cos(phase * 4.7) * 0.15;
      const randomNoise = (Math.random() - 0.5) * 0.15;
      const wave = Math.max(0.15, Math.min(1.0, 0.5 + harmonic1 + harmonic2 + harmonic3 + randomNoise));
      onWaveUpdate(wave);
    }, 60);
  }

  private stopWaveSimulation(onWaveUpdate?: (level: number) => void): void {
    if (this.waveInterval !== null) {
      clearInterval(this.waveInterval);
      this.waveInterval = null;
    }
    if (onWaveUpdate) {
      onWaveUpdate(0);
    }
  }
}

export const speechService = new SpeechService();
