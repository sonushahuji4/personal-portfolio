'use client';

/**
 * Generates audio tones using Web Audio API.
 * No external audio files needed — pure synthesis.
 */

type AudioContextType = typeof AudioContext;

let sharedContext: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  try {
    if (sharedContext && sharedContext.state !== 'closed') {
      if (sharedContext.state === 'suspended') sharedContext.resume();
      return sharedContext;
    }
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: AudioContextType }).webkitAudioContext;
    if (!Ctx) return null;
    sharedContext = new Ctx();
    return sharedContext;
  } catch {
    return null;
  }
};

// Guitar strum: rapid arpeggio of harmonics
export const playGuitarStrum = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  const notes = [329.63, 392.0, 493.88, 587.33, 659.25]; // E4 G4 B4 D5 E5
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.05 + 0.8);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + i * 0.05);
    osc.stop(ctx.currentTime + i * 0.05 + 0.8);
  });
};

// Piano chord: soft major chord
export const playPianoChord = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  const notes = [261.63, 329.63, 392.0]; // C4 E4 G4 (C major)
  notes.forEach((freq) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1.2);
  });
};

// Football whistle: short high pitch
export const playWhistle = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(2800, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(3200, ctx.currentTime + 0.1);
  osc.frequency.setValueAtTime(2800, ctx.currentTime + 0.1);
  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.3);
};

// Code/keyboard typing sound
export const playKeyClick = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'square';
  osc.frequency.value = 800 + Math.random() * 400;
  gain.gain.setValueAtTime(0.03, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.05);
};

// Success/achievement chime
export const playChime = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  [523.25, 659.25, 783.99].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + i * 0.12);
    osc.stop(ctx.currentTime + i * 0.12 + 0.5);
  });
};

// Bounce sound (basketball/sports)
export const playBounce = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(300, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.2);
};

// Map hobby names to sound functions
export const HOBBY_SOUNDS: Record<string, () => void> = {
  // Tech Zone
  'Hackathons': playKeyClick,
  'Open Source': playChime,
  'Competitive Programming': playKeyClick,
  // Sports Zone
  'Football': playWhistle,
  'Marathons': playBounce,
  'Basketball & Hockey': playBounce,
  // Music & Chill Zone
  'Music Appreciation': playPianoChord,
  'Exploration & Travel': playChime,
  'Creative Roots': playGuitarStrum,
};
