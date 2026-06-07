// Synthèse sonore Web Audio pour l'applet de Mathématiques
// Permet de générer des effets sonores de haute qualité logiquement et de manière fluide.

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    // @ts-ignore
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx!;
}

// Joue un son simple avec contrôle du gain, du type d'oscillateur, et de l'enveloppe
export function playTone(
  frequency: number,
  type: OscillatorType,
  duration: number,
  volume = 0.1,
  frequencySlide?: number
) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    if (frequencySlide) {
      osc.frequency.exponentialRampToValueAtTime(frequencySlide, ctx.currentTime + duration);
    }

    // ADSR minimal (Enveloppe d'amplitude)
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (error) {
    console.warn("Échec de la lecture audio", error);
  }
}

// 1. Son d'obtention de XP (Bip aigu scintillant)
export function playXpGainSound() {
  playTone(880, 'sine', 0.15, 0.08, 1200);
}

// 2. Chansonette de level up (Mélodie ascendante joyeuse)
export function playLvlUpSound() {
  const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
  notes.forEach((freq, index) => {
    setTimeout(() => {
      playTone(freq, 'triangle', 0.25, 0.1, freq * 1.1);
    }, index * 90);
  });
}

// 3. Fanfare de badge débloqué (Accord triomphant)
export function playBadgeUnlockSound() {
  const chords = [
    { freq: 261.63, delay: 0 },
    { freq: 329.63, delay: 0 },
    { freq: 392.00, delay: 0 },
    { freq: 523.25, delay: 150 },
    { freq: 659.25, delay: 150 },
    { freq: 783.99, delay: 150 },
    { freq: 1046.50, delay: 300 }
  ];
  chords.forEach(c => {
    setTimeout(() => {
      playTone(c.freq, 'sawtooth', 0.6, 0.05, c.freq * 1.05);
    }, c.delay);
  });
}

// 4. Succès (Excellent quiz, réponse correcte)
export function playSuccessSound() {
  playTone(523.25, 'sine', 0.12, 0.08);
  setTimeout(() => {
    playTone(659.25, 'sine', 0.2, 0.08, 783.99);
  }, 100);
}

// 5. Échec (Quiz ou calcul mental incorrect)
export function playFailureSound() {
  playTone(220, 'triangle', 0.25, 0.1, 110);
}

// 6. Clic doux (Intéraction boutons)
export function playTapSound() {
  playTone(600, 'sine', 0.05, 0.04, 300);
}
