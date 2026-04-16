'use client';

let audioCtx: AudioContext | null = null;

function initAudio() {
  if (typeof window === 'undefined') return;
  try {
    if (!audioCtx || audioCtx.state === 'closed') {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtx = new Ctx();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
  } catch { /* browser blocked */ }
}

export function playClick() {
  initAudio();
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.frequency.value = 2400;
  osc.type = 'square';
  gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.04);
}

export function playStatic(duration = 0.5) {
  initAudio();
  if (!audioCtx) return;
  const bufferSize = Math.floor(audioCtx.sampleRate * duration);
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.06;
  }
  const source = audioCtx.createBufferSource();
  const gain = audioCtx.createGain();
  source.buffer = buffer;
  source.connect(gain);
  gain.connect(audioCtx.destination);
  gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  source.start();
  source.stop(audioCtx.currentTime + duration);
}
