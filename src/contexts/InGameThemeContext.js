import React, { createContext, useContext, useState } from "react";
import Theme_Default from "../styles/theme-default.json";
import Theme_Contrast from "../styles/theme-contrast.json";
import { ThemeContext } from "./ThemeContext";

export const InGameThemeContext = createContext("");

export const InGameThemeContextProvider = (props) => {
  const THEMES = {
    default: Theme_Default,
    contrast: Theme_Contrast,
  };

  const { selectedTheme, animation } = useContext(ThemeContext);

  const [inGameSelectedTheme, setInGameSelectedTheme] = useState(selectedTheme);
  const [inGameAnimation, setInGameAnimation] = useState(animation);

  const inGameTheme = THEMES[inGameSelectedTheme];

  return (
    <InGameThemeContext.Provider
      value={{
        inGameSelectedTheme,
        inGameTheme,
        setInGameSelectedTheme,
        inGameAnimation,
        setInGameAnimation,
      }}
    >
      {props.children}
    </InGameThemeContext.Provider>
  );
};
