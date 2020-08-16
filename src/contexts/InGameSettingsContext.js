import React, { useReducer, createContext, useContext } from "react";
import { Authcontext } from "./AuthContext";

export const InGameSettingsContext = createContext("default");

export const InGameSettingsContextProvider = (props) => {
  const DEFAULT_INGAME_SETTINGS = useContext(Authcontext).userData.settings;

  const settingsReducer = (state, action) => {
    switch (action.type) {
      case "LOAD_INGAME_SETTINGS":
        return action.value;
      case "REMATCH":
        return { ...action.value, p1: action.p1, p2: action.p2 };
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

  console.log("INGAME CONTEXT", inGameSettings);
  return (
    <InGameSettingsContext.Provider
      value={{ inGameSettings, dispatchInGameSettings }}
    >
      {props.children}
    </InGameSettingsContext.Provider>
  );
};
