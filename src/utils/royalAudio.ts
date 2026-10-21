/**
 * Royal Indian Wedding Audio Engine
 * Background Track: Kabir Café performing Chadariya Jheeni Re Jheeni Live
 * - Continuous, looping HTMLAudioElement background music
 * - Initiated synchronously on "Open Our Invitation" user gesture
 * - Synchronized with floating Music On / Music Off controls
 * - Gentle fade-in on initial play, resumes from position on unpause
 */

export const WEDDING_AUDIO_SRC = '/audio/wedding-background.mp3';

class RoyalAudioEngine {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private targetVolume = 0.40; // 40% pleasant background level
  private fadeInterval: number | null = null;
  private listeners: Set<(isPlaying: boolean) => void> = new Set();
  private userMutedPref = false;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const saved = sessionStorage.getItem('mn_royal_wedding_muted');
        if (saved === 'true') {
          this.userMutedPref = true;
        }
      } catch {
        // ignore storage errors
      }
    }
  }

  private initAudio(): HTMLAudioElement | null {
    if (typeof window === 'undefined') return null;
    if (!this.audio) {
      const audio = new Audio(WEDDING_AUDIO_SRC);
      audio.preload = 'auto';
      audio.loop = true;
      audio.volume = this.targetVolume;

      audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      audio.addEventListener('ended', () => {
        // In case loop fails on certain mobile webviews
        audio.currentTime = 0;
        audio.play().catch(() => {});
      });

      audio.addEventListener('error', (e) => {
        console.warn('Audio playback error:', e);
        this.isPlaying = false;
        this.notify();
      });

      this.audio = audio;
    }
    return this.audio;
  }

  public subscribe(cb: (isPlaying: boolean) => void): () => void {
    this.listeners.add(cb);
    cb(this.isPlaying);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify(): void {
    this.listeners.forEach((cb) => {
      try {
        cb(this.isPlaying);
      } catch {
        // ignore callback error
      }
    });
  }

  public getPlaying(): boolean {
    return this.isPlaying;
  }

  public getMuted(): boolean {
    // If user explicitly muted on cover before opening
    if (!this.audio && this.userMutedPref) {
      return true;
    }
    return !this.isPlaying;
  }

  public getUserMutedPref(): boolean {
    return this.userMutedPref;
  }

  public setUserMutedPref(muted: boolean): void {
    this.userMutedPref = muted;
    try {
      sessionStorage.setItem('mn_royal_wedding_muted', String(muted));
    } catch {
      // ignore
    }
    if (muted && this.isPlaying) {
      this.pause();
    }
  }

  /**
   * Starts playback synchronously within a user gesture (e.g. clicking "Open Our Invitation").
   * Applies a gentle 1.5–2-second fade-in.
   */
  public play(fadeIn = true): Promise<void> {
    const audio = this.initAudio();
    if (!audio) return Promise.resolve();

    if (this.fadeInterval !== null) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    if (fadeIn) {
      audio.volume = 0.05;
      const stepDuration = 50;
      const totalSteps = 30; // ~1.5s total fade-in
      const stepDelta = (this.targetVolume - 0.05) / totalSteps;
      let stepCount = 0;

      this.fadeInterval = window.setInterval(() => {
        if (!this.audio || this.audio.paused) {
          if (this.fadeInterval !== null) clearInterval(this.fadeInterval);
          this.fadeInterval = null;
          return;
        }
        stepCount++;
        const nextVolume = Math.min(this.targetVolume, 0.05 + stepDelta * stepCount);
        this.audio.volume = nextVolume;

        if (stepCount >= totalSteps) {
          this.audio.volume = this.targetVolume;
          if (this.fadeInterval !== null) clearInterval(this.fadeInterval);
          this.fadeInterval = null;
        }
      }, stepDuration);
    } else {
      audio.volume = this.targetVolume;
    }

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      return playPromise
        .then(() => {
          this.isPlaying = true;
          this.userMutedPref = false;
          try {
            sessionStorage.setItem('mn_royal_wedding_muted', 'false');
          } catch {}
          this.notify();
        })
        .catch((err) => {
          console.warn('Audio playback blocked by browser or failed:', err);
          this.isPlaying = false;
          this.notify();
        });
    }

    this.isPlaying = true;
    this.notify();
    return Promise.resolve();
  }

  /**
   * Pauses playback without losing the current playback position.
   */
  public pause(): void {
    if (this.fadeInterval !== null) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }
    if (this.audio) {
      this.audio.pause();
    }
    this.isPlaying = false;
    this.notify();
  }

  /**
   * Toggles playback:
   * - If playing -> pause audio, keep position
   * - If paused -> resume audio from exact same position
   */
  public togglePlay(): boolean {
    const audio = this.initAudio();
    if (!audio) return false;

    if (this.isPlaying) {
      this.pause();
      this.setUserMutedPref(true);
      return false;
    } else {
      this.play(false);
      this.setUserMutedPref(false);
      return true;
    }
  }

  /**
   * Compatibility method for toggling mute / pause
   */
  public toggleMute(): boolean {
    const isNowPlaying = this.togglePlay();
    return !isNowPlaying;
  }

  public playTempleBell(): void {
    // Disabled as instructed: authentic Kabir Café MP3 track plays cleanly without audio overlap
  }

  public startAmbientMusic(): void {
    // Background MP3 track is already handled
  }

  public stopAll(): void {
    this.pause();
  }
}

export const royalAudio = new RoyalAudioEngine();
