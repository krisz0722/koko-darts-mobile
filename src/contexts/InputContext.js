import React, { useReducer, createContext } from "react";
import typeByDart from "./actions/inputContext/TypeByDart";
import ClearByDart from "./actions/inputContext/ClearByDart";
import typeByRound from "./actions/inputContext/TypeByRound";

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
        const { first, second, third, newIndex } = action;
        return {
          ...state,
          inputByDart: {
            first,
            second,
            third,
          },
          whichDart: state.whichDart + 1,
          inputIndex: newIndex,
        };
      case "INVALID":
        return {
          ...initialState,
          inputMethod: action.inputMethod,
          inputArray: ["INVALID"],
          inputByRound: ["INVALID"],
        };
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
    }
  };

  const [inputContext, dispatchInput] = useReducer(inputReducer, initialState);

  return (
    <InputContext.Provider value={{ inputContext, dispatchInput }}>
      {props.children}
    </InputContext.Provider>
  );
};
