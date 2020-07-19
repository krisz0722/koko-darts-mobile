import React, { useReducer, createContext } from "react";
import GAME_DEFAULT_STATE from "./GameDefaultState";
import { changeInput } from "./actions/ChangeInputMethod";
import type from "./actions/Type";
import finishLeg from "./actions/FinishLeg";
import rematch from "./actions/Rematch";
import changeStartingScore from "./actions/ChangeStartingScore";
import submitValidation from "./actions/SubmitValidation";
import back from "./actions/Back";
import clear from "./actions/Clear";
import bust from "./actions/Bust";
import typeNextDart from "./actions/TypeNextDart";

export const GameContext = createContext({});

export const GameContextProvider = (props) => {
  const gameReducer = (state, action = null) => {
    switch (action.type) {
      case "CHANGE_P1":
        return { ...state, p1: action.value };
      case "CHANGE_P2":
        return { ...state, p2: action.value };
      case "SWAP_PLAYERS":
        return { ...state, p1: state.p2, p2: state.p1 };
      case "CHANGE_LEGORSET":
        return { ...state, legOrSet: action.value };
      case "CHANGE_TOWIN":
        return { ...state, toWin: parseInt(action.value) };
      case "CHANGE_LEGSPERSET":
        return { ...state, legsPerSet: parseInt(action.value) };
      case "CHANGE_STARTINGSCORE":
        return changeStartingScore(state, action.value);
      case "RESET":
        return GAME_DEFAULT_STATE;

      //in-game actions

      case "SHOW_STATS":
        return { ...state, showStats: !state.showStats };
      case "CHANGE_INPUT":
        return changeInput(state);
      case "TYPE":
        return type(state, action.value);
      case "OK":
        return submitValidation(state);
      case "NEXT":
        return typeNextDart(state);
      case "BACK":
        return back(state);
      case "CLEAR":
        return clear(state);
      case "BUST":
        return bust(state);

      case "FINISH_LEG":
        return finishLeg(state, action.nodUsed, action.nodRequired);
      case "REMATCH":
        return rematch(
          state,
          action.activePlayer,
          action.inactivePlayer,
          GAME_DEFAULT_STATE,
        );
      case "CREATE_NEW_MATCH":
        return GAME_DEFAULT_STATE;
      case "NEW_MATCH":
        return {
          ...GAME_DEFAULT_STATE,
          p1: action.p1,
          p2: action.p2,
          status: "started",
        };
      default:
        return state;
    }
  };

  const initialGameState = GAME_DEFAULT_STATE;

  const [gameData, dispatchGameData] = useReducer(
    gameReducer,
    initialGameState,
  );

  console.log(gameData);

  return (
    <GameContext.Provider value={{ gameData, dispatchGameData }}>
      {props.children}
    </GameContext.Provider>
  );
};
