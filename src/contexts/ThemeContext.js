import React, { createContext, useState } from "react";
import Theme_Default from "../styles/theme-default.json";
import Theme_Contrast from "../styles/theme-contrast.json";

export const ThemeContext = createContext("");

export const ThemeContextProvider = (props) => {
  const THEMES = {
    default: Theme_Default,
    contrast: Theme_Contrast,
  };

  const [selectedTheme, setSelectedTheme] = useState("default");
  const [animation, setAnimation] = useState(true);
  const [background, setBackground] = useState(true);
  const theme = THEMES[selectedTheme];

  console.log("THEMECONTEXT", selectedTheme, animation);

  return (
    <ThemeContext.Provider
      value={{
        THEMES,
        selectedTheme,
        theme,
        setSelectedTheme,
        animation,
        setAnimation,
        background,
        setBackground,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
