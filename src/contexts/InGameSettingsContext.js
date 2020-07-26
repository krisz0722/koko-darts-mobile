import React, { useReducer, createContext, useContext } from "react";
import { SettingsContext } from "./SettingsContext";
import { ThemeContext } from "./ThemeContext";

export const InGameSettingsContext = createContext("default");

export const InGameSettingsContextProvider = (props) => {
  const { settings } = useContext(SettingsContext);
  const { animation } = useContext(ThemeContext);

  const DEFAULT_INGAME_SETTINGS = { ...settings, animation };

  const settingsReducer = (state, action) => {
    switch (action.type) {
      case "LOAD_SETTINGS":
        return action.value;
      case "CHOOSE_OPPONENT":
        return { ...state, p2: action.value };
      case "CHANGE_LAYOUT":
        return { ...state, layout: action.value };
      case "CHANGE_ANIMATION":
        return { ...state, animation: action.value };
      case "CHANGE_OPACITY":
        return { ...state, opacity: action.value };
      default:
        return state;
    }
  };

  const [inGameSettings, dispatchInGameSettings] = useReducer(
    settingsReducer,
    DEFAULT_INGAME_SETTINGS,
  );

  console.log("INGAMESETTINGSCONTEXT", inGameSettings);

  return (
    <InGameSettingsContext.Provider
      value={{ inGameSettings, dispatchInGameSettings }}
    >
      {props.children}
    </InGameSettingsContext.Provider>
  );
};
