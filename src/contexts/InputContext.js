import React, { useReducer, createContext, useContext } from "react";
import Next from "./actions/Next";
import typeByDart from "./actions/TypeByDart";
import changeInput from "./actions/ChangeInputMethod";
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

    switch (action.type) {
      case "CHANGE_INPUT":
        return changeInput(initialState, inputMethod);
      case "NEXT":
        return Next(state, action.value, initialState);
      case "CLEAR_BY_DART":
        return ClearByDart(state, initialState, inputMethod);
      case "TYPE_BY_ROUND":
        return typeByRound(state, action.value);
      case "TYPE_BY_DART":
        return typeByDart(state, action.value);
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
