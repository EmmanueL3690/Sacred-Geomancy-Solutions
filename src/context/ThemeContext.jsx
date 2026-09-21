import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Read initial theme from localStorage or default to 'dark'
  const [theme, setThemeState] = useState(() => {
    const savedTheme = localStorage.getItem('geomancy-theme');
    return savedTheme || 'dark';
  });

  const [resolvedTheme, setResolvedTheme] = useState('dark');

  // Apply theme class to document root HTML element
  const applyTheme = (targetTheme) => {
    const root = document.documentElement;
    
    // System theme check
    let effectiveTheme = targetTheme;
    if (targetTheme === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      effectiveTheme = systemPrefersDark ? 'dark' : 'light';
    }

    setResolvedTheme(effectiveTheme);

    // Toggle Tailwind dark mode class on <html>
    if (effectiveTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  };

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('geomancy-theme', newTheme);
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  // Sync theme changes on mount and when theme state updates
  useEffect(() => {
    applyTheme(theme);

    // Listen to OS theme changes when "system" theme is active
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};