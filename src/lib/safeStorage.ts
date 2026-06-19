/**
 * Cross-browser-safe localStorage wrapper.
 *
 * Accessing `localStorage` can throw in locked-down Safari, private mode, or
 * when storage is disabled entirely (e.g. `SecurityError` / `QuotaExceededError`).
 * These helpers degrade gracefully: a storage failure simply means the value
 * isn't persisted, instead of bubbling up and crashing the app.
 */

export const getItem = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const setItem = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage unavailable or full — silently skip persistence.
  }
};

export const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch {
    // Storage unavailable — nothing to remove.
  }
};
