import { createContext, useState } from 'react';
import { AppTheme } from '../types';

interface ThemeContextType {
  theme: AppTheme;
  setTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: AppTheme.light,
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(AppTheme.light);

  const toogleTheme = () => {
    const newTheme = theme === AppTheme.light ? AppTheme.dark : AppTheme.light;
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: AppTheme.light,
        setTheme: toogleTheme,
      }}
    >
      <div data-theme={`${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
