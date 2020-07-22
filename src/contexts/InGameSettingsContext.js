import React, { useReducer, createContext, useContext } from "react";
import { SettingsContext } from "./SettingsContext";

export const InGameSettingsContext = createContext("default");

export const InGameSettingsContextProvider = (props) => {
  const { settings } = useContext(SettingsContext);

  const DEFAULT_INGAME_SETTINGS = { ...settings };

  const settingsReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_LAYOUT":
        return { ...state, layout: action.value };
      case "TOGGLE_ANIMATION":
        return { ...state, animation: action.value };
      case "TOGGLE_OPACITY":
        return { ...state, opacity: action.value };
      default:
        return state;
    }
  };

  const [inGameSettings, dispatchInGameSettings] = useReducer(
    settingsReducer,
    DEFAULT_INGAME_SETTINGS,
  );

  return (
    <InGameSettingsContext.Provider
      value={{ inGameSettings, dispatchInGameSettings }}
    >
      {props.children}
    </InGameSettingsContext.Provider>
  );
};