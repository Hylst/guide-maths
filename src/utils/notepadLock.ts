// Verrou du bloc-notes : on garde une empreinte PBKDF2 salée du mot de passe, jamais le mot de passe lui-même.
// Les notes ne sont pas chiffrées : ce verrou protège l'accès sur l'appareil, pas le contenu du stockage local.

export interface NotepadLock {
  v: 1;
  alg: "PBKDF2-SHA256";
  iter: number;
  salt: string;
  hash: string;
}

export const LOCK_KEY = "maths_app_notepad_lock";
// Ancienne clé (jusqu'à V5.4.2) : mot de passe en clair, convertie en empreinte au chargement puis supprimée.
export const LEGACY_PASSWORD_KEY = "maths_app_notepad_password";

const ITERATIONS = 210_000;

const toB64 = (bytes: Uint8Array): string => btoa(String.fromCharCode(...bytes));
const fromB64 = (text: string): Uint8Array => Uint8Array.from(atob(text), (c) => c.charCodeAt(0));

// WebCrypto n'existe qu'en contexte sécurisé (HTTPS ou localhost).
export const cryptoAvailable = (): boolean =>
  typeof crypto !== "undefined" && typeof crypto.subtle !== "undefined";

async function derive(password: string, salt: Uint8Array, iterations: number): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: salt as BufferSource, iterations },
    key,
    256
  );
  return new Uint8Array(bits);
}

export async function createLock(password: string): Promise<NotepadLock> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await derive(password, salt, ITERATIONS);
  return { v: 1, alg: "PBKDF2-SHA256", iter: ITERATIONS, salt: toB64(salt), hash: toB64(hash) };
}

export async function verifyLock(password: string, lock: NotepadLock): Promise<boolean> {
  const hash = await derive(password, fromB64(lock.salt), lock.iter);
  const expected = fromB64(lock.hash);
  if (hash.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < hash.length; i++) diff |= hash[i] ^ expected[i];
  return diff === 0;
}

// Accepte la valeur stockée (chaîne JSON) ou l'objet d'une sauvegarde ; null si illisible ou hors bornes.
export function parseLock(raw: unknown): NotepadLock | null {
  try {
    const o = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (
      o &&
      typeof o === "object" &&
      o.v === 1 &&
      o.alg === "PBKDF2-SHA256" &&
      Number.isInteger(o.iter) &&
      o.iter >= 100_000 &&
      o.iter <= 5_000_000 &&
      typeof o.salt === "string" &&
      typeof o.hash === "string" &&
      fromB64(o.salt).length >= 16 &&
      fromB64(o.hash).length === 32
    ) {
      return { v: 1, alg: "PBKDF2-SHA256", iter: o.iter, salt: o.salt, hash: o.hash };
    }
  } catch {
    // valeur illisible : aucun verrou
  }
  return null;
}
