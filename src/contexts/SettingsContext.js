import React, { useReducer, createContext } from "react";
import Theme_Default from "../styles/theme-default.json";
import Theme_Contrast from "../styles/theme-contrast.json";
import { toggle_animation } from "./actions/ToggleAnimation";

export const SettingsContext = createContext("default");

export const SettingsContextProvider = (props) => {
  const THEMES = {
    default: Theme_Default,
    contrast: Theme_Contrast,
  };

  const DEFAULT_SETTINGS = {
    // selectedTheme: THEMES.contrast,
    selectedTheme: THEMES.default,
    layout: "classic",
    animation: true,
    opacity: true,
  };

  const settingsReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_THEME":
        return { ...state, selectedTheme: THEMES[action.value] };
      case "CHANGE_LAYOUT":
        return { ...state, layout: action.value };
      case "TOGGLE_ANIMATION":
        return toggle_animation(state, action.value);
      case "TOGGLE_BLUR":
        return { ...state, blur: action.value };
      case "OPACITY":
        return { ...state, opacity: action.value };
      case "RESET":
        return { ...DEFAULT_SETTINGS };
      default:
        return state;
    }
  };

  const [settings, dispatchSettings] = useReducer(
    settingsReducer,
    DEFAULT_SETTINGS,
  );

  return (
    <SettingsContext.Provider value={{ THEMES, settings, dispatchSettings }}>
      {props.children}
    </SettingsContext.Provider>
  );
};
