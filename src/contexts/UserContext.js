import React, { createContext, useReducer } from "react";

const axios = require("axios");

export const UserContext = createContext("");

export const UserContextProvider = (props) => {
  const userReducer = (state, action) => {
    switch (action.type) {
      case "REGISTER":
        return action.value;
      case "LOGIN":
        return action.value;
    }
  };

  const [user, dispatchUserData] = useReducer(userReducer, {});
  return (
    <UserContext.Provider value={{ user, dispatchUserData }}>
      {props.children}
    </UserContext.Provider>
  );
};
