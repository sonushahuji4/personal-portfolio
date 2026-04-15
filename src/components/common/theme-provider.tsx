'use client';

import { createContext, useContext, useCallback, useSyncExternalStore } from 'react';

type Theme = 'dark' | 'light';

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const getThemeSnapshot = (): Theme => {
  if (typeof window === 'undefined') return 'dark';
  return (localStorage.getItem('theme') as Theme) ||
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
};

const getServerSnapshot = (): Theme => 'dark';

let listeners: Array<() => void> = [];

const subscribe = (listener: () => void) => {
  listeners = [...listeners, listener];
  return () => { listeners = listeners.filter((l) => l !== listener); };
};

const setThemeValue = (theme: Theme) => {
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
  listeners.forEach((l) => l());
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    setThemeValue(theme === 'dark' ? 'light' : 'dark');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
