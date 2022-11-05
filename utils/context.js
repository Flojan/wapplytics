import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

export function ThemeContextProvider(props) {
  const [theme, setTheme] = useState();
  useEffect(() => {
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
      localStorage.theme = "light";
    }
  }, []);

  function toggleThemeHandler() {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.remove("dark");
      setTheme("light");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      setTheme("dark");
      localStorage.theme = "dark";
    }
  }

  const context = {
    theme: theme,
    toggleTheme: toggleThemeHandler,
  };

  return <ThemeContext.Provider value={context}>{props.children}</ThemeContext.Provider>;
}

export default ThemeContext;
