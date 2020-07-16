import React, { useReducer, createContext } from "react";
import GAME_DEFAULT_STATE from "./GameDefaultState";
import { changeInput } from "./actions/ChangeInputMethod";
import type from "./actions/Type";
import submit from "./actions/Submit";
import finishLeg from "./actions/FinishLeg";
import rematch from "./actions/Rematch";
import changeStartingScore from "./actions/ChangeStartingScore";

export const GameContext = createContext({});

export const GameContextProvider = (props) => {
  const gameReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_AP":
        return { ...state, activePlayer: action.value };
      case "CHANGE_P1":
        return { ...state, p1: action.value };
      case "CHANGE_P2":
        return { ...state, p2: action.value };
      case "SWAP_PLAYERS":
        return { ...state, p1: action.p1, p2: action.p2 };
      case "SHOW_STATS":
        return { ...state, showStats: !state.showStats };
      case "CHANGE_LEGORSET":
        return { ...state, legOrSet: action.value };
      case "CHANGE_TOWIN":
        return { ...state, toWin: parseInt(action.value) };
      case "CHANGE_LEGSPERSET":
        return { ...state, legsPerSet: parseInt(action.value) };
      case "CHANGE_STARTINGSCORE":
        return changeStartingScore(state, action.value);
      case "CHANGE_INPUT":
        return changeInput(state);
      case "TYPE":
        return type(state, action.value);
      case "SUBMIT":
        return submit(state, action.value);
      case "FINISH_LEG":
        return finishLeg(
          state,
          action.numOfCoDartsUsed,
          action.numOfCoDartsRequired,
        );
      case "INITIATE_REMATCH":
        return { ...state, isRematch: true, isMatchOver: false };
      case "REMATCH":
        return rematch(state, action.value, action.value2, GAME_DEFAULT_STATE);
      case "CREATE_NEW_MATCH":
        return action.value;
      case "NEW_MATCH":
        return {
          ...GAME_DEFAULT_STATE,
          p1: action.value,
          userName: action.value,
        };
      case "LAST_MATCH":
        return action.value;
      case "RESET":
        return GAME_DEFAULT_STATE;
      default:
        return state;
    }
  };

  const initialGameState = GAME_DEFAULT_STATE;

  const [gameData, dispatchGameData] = useReducer(
    gameReducer,
    initialGameState,
  );

  console.log(gameData.p1_DATA.score);
  console.log(gameData.p2_DATA.score);
  console.log(gameData.p2_DATA.score);

  return (
    <GameContext.Provider value={{ gameData, dispatchGameData }}>
      {props.children}
    </GameContext.Provider>
  );
};
