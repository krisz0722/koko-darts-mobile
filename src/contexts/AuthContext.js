import React, { useReducer, useCallback, createContext } from "react";

export const Authcontext = createContext({});

export const AuthcontextProvider = (props) => {
  const authReducer = useCallback((state, action = null) => {
    switch (action.type) {
      case "CREATE_PROFILE":
        console.log("AUTCHCONTEXT: creating profile....");
        return { ...action.value };
      case "UPDATE_SETTINGS":
        console.log("AUTCHCONTEXT: updating settings....");
        return { ...state, settings: { ...action.value } };
      case "UPDATE_FRIENDS":
        console.log("AUTCHCONTEXT: updating friends....");
        return { ...state, friends: [...action.value] };
      case "UPDATE_PROFILE":
        console.log("AUTCHCONTEXT: updating profile....");
        return { ...action.value };
      case "UPDATE_MATCHES":
        console.log("AUTCHCONTEXT: updating matches....");
        return { ...state, matches: [...action.value] };
      default:
        return state;
    }
  }, []);

  const initialAuth = {};

  const [userData, dispatchUserData] = useReducer(authReducer, initialAuth);

  console.log("CONTEXT", userData);

  return (
    <Authcontext.Provider value={{ userData, dispatchUserData }}>
      {props.children}
    </Authcontext.Provider>
  );
};
