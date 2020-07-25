import React, { useReducer, createContext, useContext } from "react";
import { SettingsContext } from "./SettingsContext";

export const InGameSettingsContext = createContext("default");

export const InGameSettingsContextProvider = (props) => {
  const { settings } = useContext(SettingsContext);

  const DEFAULT_INGAME_SETTINGS = { ...settings };

  const settingsReducer = (state, action) => {
    switch (action.type) {
      case "LOAD_SETTINGS":
        return action.value;
      case "SWAP_PLAYERS":
        return { ...state, p1: action.p2, p2: action.p1 };
      case "CHOOSE_OPPONENT":
        return { ...state, p2: action.value };
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
