import React, { useReducer, useContext, createContext } from "react";
import { Authcontext } from "./AuthContext";

export const SettingsContext = createContext("default");

export const SettingsContextProvider = (props) => {
  const DEFAULT_SETTINGS = useContext(Authcontext).userData.settings;

  console.log("DEFAULTS", DEFAULT_SETTINGS);

  const settingsReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_LAYOUT":
        return { ...state, layout: action.value };
      case "LOAD_SETTINGS":
        return action.value;
      case "SAVE_SETTINGS":
        return action.value;
      case "RESET":
        return action.value;
      case "CHOOSE_OPPONENT":
        return { ...state, p2: action.value };
      case "REMATCH":
        return { ...state, p1: action.p1, p2: action.p2 };
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
    <SettingsContext.Provider value={{ settings, dispatchSettings }}>
      {props.children}
    </SettingsContext.Provider>
  );
};
