import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme; // user's selected preference
  resolvedTheme: 'light' | 'dark'; // actual theme applied
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'dark'; // Default to dark theme
    return savedTheme;
  });
  const [systemDark, setSystemDark] = useState<boolean>(() => true); // Default to dark

  const resolvedTheme = useMemo<'light' | 'dark'>(() => {
    if (theme === 'system') return systemDark ? 'dark' : 'light';
    return theme;
  }, [theme, systemDark]);

  // Watch system preference changes
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    if (mq.addEventListener) {
      mq.addEventListener('change', listener);
    } else {
      // Safari
      mq.addListener(listener);
    }
    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener('change', listener);
      } else {
        mq.removeListener(listener);
      }
    };
  }, []);

  useEffect(() => {
    if (resolvedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [resolvedTheme, theme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
