import React, { useReducer, useCallback, createContext, useMemo } from "react";
import updateAuthProfile from "./actions/authContext/UpdateProfile";
import updateAuthSettings from "./actions/authContext/UpdateSettings";
import Theme_Default from "../styles/theme-default.json";
import Theme_Contrast from "../styles/theme-contrast.json";
import updateAuthMatchesAdd from "./actions/authContext/UpdateMatchesAdd";
import updateAuthMatchesSave from "./actions/authContext/UpdateMatchesSave";

export const Authcontext = createContext({});

export const AuthcontextProvider = (props) => {
  const THEMES = useMemo(
    () => ({
      default: Theme_Default,
      contrast: Theme_Contrast,
    }),
    [],
  );

  const authReducer = useCallback(
    (state, action = null) => {
      switch (action.type) {
        case "CREATE_PROFILE":
          return { ...action.value };
        // case "UPDATE_FRIENDS":
        //   return { ...state, friends: [...action.value] };
        case "UPDATE_SETTINGS":
          return updateAuthSettings(state, action.value);
        case "UPDATE_PROFILE":
          return updateAuthProfile(state, action.value);
        case "UPDATE_MATCHES_SAVE":
          return updateAuthMatchesSave(state, action.value);
        case "UPDATE_MATCHES_ADD":
          return updateAuthMatchesAdd(state, action.value, THEMES);
        default:
          return state;
      }
    },
    [THEMES],
  );

  const initialAuth = {};

  const [userData, dispatchUserData] = useReducer(authReducer, initialAuth);

  console.log("CONTEXT", userData);

  return (
    <Authcontext.Provider value={{ userData, dispatchUserData }}>
      {props.children}
    </Authcontext.Provider>
  );
};
