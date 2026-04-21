/**
 * Session storage utility for browser-based data persistence.
 * This ensures that each user session is independent and resets on tab close.
 */

const IS_SERVER = typeof window === 'undefined';

export const getData = <T>(key: string, defaultValue: T): T => {
  if (IS_SERVER) return defaultValue;
  try {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`Error reading from sessionStorage for key "${key}":`, error);
    return defaultValue;
  }
};

export const setData = <T>(key: string, value: T): void => {
  if (IS_SERVER) return;
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to sessionStorage for key "${key}":`, error);
  }
};

export const resetData = (key: string): void => {
  if (IS_SERVER) return;
  sessionStorage.removeItem(key);
};

export const clearAllData = (): void => {
  if (IS_SERVER) return;
  sessionStorage.clear();
};
