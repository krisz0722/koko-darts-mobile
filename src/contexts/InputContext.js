import React, { useReducer, createContext } from "react";
import Next from "./actions/Next";
import typeByDart from "./actions/TypeByDart";
import ClearByDart from "./actions/ClearByDart";
import typeByRound from "./actions/TypeByRound";

export const InputContext = createContext({});

export const InputContextProvider = (props) => {
  const initialState = {
    inputMethod: "byRound",
    inputIndex: 0,
    inputArray: ["", "", "", "", "", ""],
    inputByRound: ["", "", ""],
    inputByDart: {
      first: ["", ""],
      second: ["", ""],
      third: ["", ""],
    },
    whichDart: 1,
  };

  const inputReducer = (state, action = null) => {
    const { inputMethod } = state;
    const newInputMethod = inputMethod === "byDart" ? "byRound" : "byDart";
    switch (action.type) {
      case "CHANGE_INPUT":
        return ClearByDart(state, initialState, newInputMethod);
      case "NEXT":
        return Next(state, action.value, initialState);
      case "CLEAR_BY_DART":
        return ClearByDart(state, initialState, inputMethod);
      case "TYPE":
        if (inputMethod === "byDart") {
          return typeByDart(state, action.value);
        } else {
          return typeByRound(state, action.value);
        }
      case "SET_DEFAULT":
        return initialState;
      case "INVALID":
        return {
          ...initialState,
          inputArray: ["INVALID"],
          inputByRound: ["INVALID"],
        };
    }
  };

  const [inputContext, dispatchInput] = useReducer(inputReducer, initialState);

  console.log("INPUT CONTEXT", inputContext);

  return (
    <InputContext.Provider value={{ inputContext, dispatchInput }}>
      {props.children}
    </InputContext.Provider>
  );
};
