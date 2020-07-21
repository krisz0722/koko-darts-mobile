import React, { useReducer, createContext } from "react";
import Theme_Default from "../styles/theme-default.json";
import Theme_Contrast from "../styles/theme-contrast.json";
import changeStartingScore from "./actions/ChangeStartingScore";

export const SettingsContext = createContext("default");

export const SettingsContextProvider = (props) => {
  const THEMES = {
    default: Theme_Default,
    contrast: Theme_Contrast,
  };

  const DEFAULT_SETTINGS = {
    layout: "classic",
    animation: true,
    opacity: true,
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
      case "CHANGE_P1":
        return { ...state, p1: action.value };
      case "CHANGE_P2":
        return { ...state, p2: action.value };
      case "SWAP_PLAYERS":
        return { ...state, p1: state.p2, p2: state.p1 };
      case "CHANGE_LEGORSET":
        return { ...state, legOrSet: action.value };
      case "CHANGE_TOWIN":
        return { ...state, toWin: parseInt(action.value) };
      case "CHANGE_LEGSPERSET":
        return { ...state, legsPerSet: parseInt(action.value) };
      case "CHANGE_STARTINGSCORE":
        return changeStartingScore(state, action.value);
      case "CHANGE_LAYOUT":
        return { ...state, layout: action.value };

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
