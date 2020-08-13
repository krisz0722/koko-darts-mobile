import React, { useReducer, createContext } from "react";
import Theme_Default from "../styles/theme-default.json";
import Theme_Contrast from "../styles/theme-contrast.json";

export const SettingsContext = createContext("default");

export const SettingsContextProvider = (props) => {
  const DEFAULT_SETTINGS = {
    p1: {
      key: "USER",
      img: require("../../assets/bg.png"),
    },
    p2: {
      key: "",
      img: "",
    },
    userName: "USER",
    layout: "classic",
    legOrSet: "leg",
    toWin: 1,
    legsPerSet: 3,
    startingScore: 301,
    playerToStartLeg: "p1",
    opacity: true,
  };

  const settingsReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_LAYOUT":
        return { ...state, layout: action.value };
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

  return (
    <SettingsContext.Provider value={{ settings, dispatchSettings }}>
      {props.children}
    </SettingsContext.Provider>
  );
};
