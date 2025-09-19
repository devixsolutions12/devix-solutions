// Client-side storage utility to safely handle localStorage access
// This prevents errors when localStorage is not available (e.g., server-side rendering)

export const isClient = typeof window !== 'undefined';

export const setItem = (key: string, value: string): void => {
  if (isClient) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn(`Failed to set item in localStorage: ${error}`);
    }
  }
};

export const getItem = (key: string): string | null => {
  if (isClient) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn(`Failed to get item from localStorage: ${error}`);
      return null;
    }
  }
  return null;
};

export const removeItem = (key: string): void => {
  if (isClient) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Failed to remove item from localStorage: ${error}`);
    }
  }
};