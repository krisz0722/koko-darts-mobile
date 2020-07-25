import React, { useReducer, createContext, useContext } from "react";
import GAME_DEFAULT_STATE from "./GameDefaultState";
import { changeInput } from "./actions/ChangeInputMethod";
import type from "./actions/Type";
import finishLeg from "./actions/FinishLeg";
import rematch from "./actions/Rematch";
import submitValidation from "./actions/SubmitValidation";
import undo from "./actions/Undo";
import clear from "./actions/Clear";
import bust from "./actions/Bust";
import typeNextDart from "./actions/TypeNextDart";
import { SettingsContext } from "./SettingsContext";

export const GameContext = createContext({});

export const GameContextProvider = (props) => {
  const { settings } = useContext(SettingsContext);

  const initialGameState = {
    ...GAME_DEFAULT_STATE,
    ...settings,
  };

  const gameReducer = (state, action = null) => {
    switch (action.type) {
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
      case "UNDO":
        return undo(state);
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
          ...initialGameState,
          p1: action.p1,
          p2: action.p2,
          status: "started",
        };
      default:
        return state;
    }
  };

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
