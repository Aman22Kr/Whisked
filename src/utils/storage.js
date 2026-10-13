import { QUICK } from '../config';

const key = (k) => QUICK.storagePrefix + k;

export function readStore(k, fallback, validate) {
  try {
    const raw = window.localStorage.getItem(key(k));
    if (raw == null) return fallback;
    const parsed = JSON.parse(raw);
    if (validate && !validate(parsed)) return fallback;
    return parsed;
  } catch {
    return fallback; // malformed JSON, blocked storage, etc.
  }
}

export function writeStore(k, value) {
  try {
    window.localStorage.setItem(key(k), JSON.stringify(value));
    return true;
  } catch {
    return false; // quota exceeded / private mode
  }
}

export function clearAllStore() {
  try {
    Object.keys(window.localStorage)
      .filter((n) => n.startsWith(QUICK.storagePrefix))
      .forEach((n) => window.localStorage.removeItem(n));
  } catch { /* ignore */ }
}
