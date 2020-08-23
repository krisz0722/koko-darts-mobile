import React, { useReducer, useCallback, createContext, useMemo } from "react";

export const Authcontext = createContext({});

export const AuthcontextProvider = (props) => {
  const authReducer = useCallback((state, action = null) => {
    switch (action.type) {
      case "CREATE_PROFILE":
        return { ...action.value };
      case "UPDATE_PROFILE":
        return { ...action.value };
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
