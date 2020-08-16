import React, { useReducer, createContext, useContext } from "react";

export const Authcontext = createContext({});

export const AuthcontextProvider = (props) => {
  const authReducer = (state, action = null) => {
    switch (action.type) {
      case "CREATE_PROFILE":
        return { ...action.value };
      case "UPDATE_SETTINGS":
        return { ...state, settings: { ...action.value } };
      case "UPDATE_FRIENDS":
        return { ...state, friends: { ...action.value } };
      case "UPDATE_MATCHES":
        return { ...state, matches: { ...action.value } };
      case "UPDATE_PROFILE":
        return { ...state, friends: { ...action.value } };
      case "UPDATE_REQUESTS":
        return { ...state, requestReceived: { ...action.value } };
      default:
        return state;
    }
  };

  const initialAuth = {};

  const [userData, dispatchUserData] = useReducer(authReducer, initialAuth);

  console.log("CONTEXT", userData);

  return (
    <Authcontext.Provider value={{ userData, dispatchUserData }}>
      {props.children}
    </Authcontext.Provider>
  );
};
