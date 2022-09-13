import { useEffect, useState } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const systemPreference = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const themeStorage = localStorage.getItem('theme');

    if (themeStorage === 'dark' || (themeStorage === null && systemPreference)) {
      document.body.classList.add('dark');
      setTheme('dark');
    } else {
      document.body.classList.remove('dark');
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.body.classList.add('dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      document.body.classList.remove('dark');
      window.localStorage.setItem('theme', 'light');
    }
  };

  return { theme, toggleTheme };
};

export default useTheme;
