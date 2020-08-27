import React, { createContext, useCallback, useMemo, useReducer } from "react";
import Theme_Default from "../styles/theme-default.json";
import Theme_Contrast from "../styles/theme-contrast.json";

export const ThemeContext = createContext("");

export const ThemeContextProvider = (props) => {
  const THEMES = useMemo(
    () => ({
      default: Theme_Default,
      contrast: Theme_Contrast,
    }),
    [],
  );

  const initialTheme = {
    selectedTheme: "contrast",
    animation: true,
    background: true,
  };

  const themeReducer = useCallback((state, action) => {
    switch (action.type) {
      case "LOAD_THEME":
        return action.value;
      case "CHANGE_THEME":
        return { ...state, selectedTheme: action.value };
      case "CHANGE_ANIMATION":
        return { ...state, animation: action.value };
      case "CHANGE_BACKGROUND":
        return { ...state, background: action.value };
    }
  }, []);

  const [themeContext, dispatchTheme] = useReducer(themeReducer, initialTheme);

  const theme = THEMES[themeContext.selectedTheme];

  return (
    <ThemeContext.Provider
      value={{
        themeContext,
        theme,
        dispatchTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
