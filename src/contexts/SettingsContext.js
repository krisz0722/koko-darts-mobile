import React, { useReducer, createContext } from "react";
import Theme_Default from "../styles/theme-default.json";
import Theme_Contrast from "../styles/theme-contrast.json";

export const SettingsContext = createContext("default");

export const SettingsContextProvider = (props) => {
  const THEMES = {
    default: Theme_Default,
    contrast: Theme_Contrast,
  };

  const DEFAULT_SETTINGS = {
    layout: "classic",
    p1: "esmeralda",
    p2: "jose armando",
    legOrSet: "leg",
    toWin: 1,
    legsPerSet: 3,
    startingScore: 301,
    playerToStartLeg: "p1",
  };

  const settingsReducer = (state, action) => {
    switch (action.type) {
      case "SAVE_SETTINGS":
        console.log("saving settings...");
        return action.value;
      case "RESET":
        console.log("resettings saved user settings...");
        return action.value;
      default:
        return state;
    }
  };

  const [settings, dispatchSettings] = useReducer(
    settingsReducer,
    DEFAULT_SETTINGS,
  );

  console.log("SETTINGSCONTEXT", settings);

  return (
    <SettingsContext.Provider value={{ THEMES, settings, dispatchSettings }}>
      {props.children}
    </SettingsContext.Provider>
  );
};
