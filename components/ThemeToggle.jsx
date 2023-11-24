"use client";

import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { useState } from "react";

const themes = {
  lofi: "lofi",
  dracula: "dracula",
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(themes.lofi);

  const toggleTheme = () => {
    const newTheme = theme === themes.lofi ? themes.dracula : themes.lofi;

    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <button className="btn btn-xs btn-outline" onClick={toggleTheme}>
      {theme === themes.lofi ? (
        <BsMoonFill className="h-4 w-4" />
      ) : (
        <BsSunFill className="h-4 w-4" />
      )}
    </button>
  );
};
export default ThemeToggle;
