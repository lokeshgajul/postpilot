import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme == "light") {
      setTheme("dark");
      document.body.style.backgroundColor = "#212121";
    } else {
      setTheme("light");
      document.body.style.backgroundColor = "#fff";
    }
  };

  const value = {
    toggleTheme,
    theme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
