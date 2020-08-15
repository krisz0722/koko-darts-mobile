import React, { useReducer, createContext, useContext } from "react";

export const Authcontext = createContext({});

export const AuthcontextProvider = (props) => {
  const authReducer = (state, action = null) => {
    switch (action.type) {
      case "CREATE_PROFILE":
        console.log("creating profile");
        return { ...action.value };
      default:
        return state;
    }
  };

  const initialAuth = {
    username: "USER",
    email: "",
    img: require("../../assets/bg.png"),
    overall: {
      gamesPlayed: 0,
      winningPercentage: 0,
      overallAvg: 0,
      bestMatch: 0,
    },
    registeredOn: "",
    friends: [],
    matches: [],
    requestReceived: [],
    requestSent: [],
    settings: {
      p1: {
        key: "USER",
        img: require("../../assets/bg.png"),
      },
      p2: {
        key: "",
        img: "",
      },
      layout: "classic",
      legOrSet: "leg",
      toWin: 1,
      legsPerSet: 3,
      startingScore: 301,
      playerToStartLeg: "p1",
      opacity: true,
    },
  };

  const [userData, dispatchUserData] = useReducer(authReducer, initialAuth);

  console.log("CONTEXT", userData);

  return (
    <Authcontext.Provider value={{ userData, dispatchUserData }}>
      {props.children}
    </Authcontext.Provider>
  );
};
