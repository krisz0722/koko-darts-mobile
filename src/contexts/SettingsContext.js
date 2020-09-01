import React, { useCallback, useReducer, createContext } from "react";

export const SettingsContext = createContext("default");

export const SettingsContextProvider = (props) => {
  const settingsReducer = useCallback((state, action) => {
    switch (action.type) {
      case "CHANGE_LAYOUT":
        return { ...state, layout: action.value };
      case "LOAD_SETTINGS":
        return action.value;
      case "SAVE_SETTINGS":
        return action.value;
      case "RESET":
        return {};
      case "CHOOSE_OPPONENT":
        return { ...state, p2: action.value };
      case "REMATCH":
        return { ...state, p1: action.p1, p2: action.p2 };
      default:
        return state;
    }
  }, []);

  const [settings, dispatchSettings] = useReducer(settingsReducer, {});

  console.log("SETTINGSCONTEXT", settings);

  return (
    <SettingsContext.Provider value={{ settings, dispatchSettings }}>
      {props.children}
    </SettingsContext.Provider>
  );
};
