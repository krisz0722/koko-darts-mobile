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
    p1: {
      key: "USER",
      img: require("../../assets/bgPortrait.jpeg"),
    },
    p2: {
      key: "",
      img: "",
    },
    userName: "UESR",
    layout: "classic",
    legOrSet: "set",
    toWin: 3,
    legsPerSet: 3,
    startingScore: 501,
    playerToStartLeg: "p1",
    opacity: true,
    animation: true,
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
