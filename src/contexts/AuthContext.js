import React, { useReducer, useCallback, createContext } from "react";

export const Authcontext = createContext({});

export const AuthcontextProvider = (props) => {
  const authReducer = useCallback((state, action = null) => {
    switch (action.type) {
      case "CREATE_PROFILE":
        return { ...action.value };
      case "UPDATE_PROFILE":
        return { ...action.value };
      case "DELETING_PROFILE":
        return {};
      default:
        return state;
    }
  }, []);

  const [userData, dispatchUserData] = useReducer(authReducer, {});

  return (
    <Authcontext.Provider value={{ userData, dispatchUserData }}>
      {props.children}
    </Authcontext.Provider>
  );
};
