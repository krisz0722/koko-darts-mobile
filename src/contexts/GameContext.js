import React, { useReducer, createContext, useContext } from "react";
import GAME_DEFAULT_STATE from "./GameDefaultState";
import finishLeg from "./actions/FinishLeg";
import Rematch from "./actions/Rematch";
import undo from "./actions/Undo";
import bust from "./actions/Bust";
import typeNextDart from "./actions/TypeNextDart";
import { InGameSettingsContext } from "./InGameSettingsContext";
import submitUpdateScore from "./actions/SubmitUpdateScore";
import UpdateByDart from "./actions/UpdateByDart";

export const GameContext = createContext({});

export const GameContextProvider = (props) => {
  const { inGameSettings } = useContext(InGameSettingsContext);

  const initialGameState = {
    ...GAME_DEFAULT_STATE,
    ...inGameSettings,
    p1_DATA: {
      ...GAME_DEFAULT_STATE.p1_DATA,
      score: inGameSettings.startingScore,
    },
    p2_DATA: {
      ...GAME_DEFAULT_STATE.p2_DATA,
      score: inGameSettings.startingScore,
    },
  };

  const gameReducer = (state, action = null) => {
    switch (action.type) {
      case "UPDATE_BY_DART":
        return UpdateByDart(state, action.scoreToSubmit, action.newScore);
      case "SUBMIT":
        return submitUpdateScore(
          state,
          action.playerKey,
          action.value,
          action.method,
          1,
        );

      case "LOAD_SETTINGS":
        const settings = action.value;
        return {
          ...GAME_DEFAULT_STATE,
          ...action.value,
          p1_DATA: {
            ...GAME_DEFAULT_STATE.p1_DATA,
            score: settings.startingScore,
          },
          p2_DATA: {
            ...GAME_DEFAULT_STATE.p2_DATA,
            score: settings.startingScore,
          },
        };
      case "RESET":
        return GAME_DEFAULT_STATE;
      //in-game actions
      case "NEXT":
        return typeNextDart(state);
      case "UNDO":
        return undo(state);
      case "BUST":
        return bust(state);
      case "FINISH_LEG":
        return finishLeg(
          state,
          action.nodUsed,
          action.nodRequired,
          action.settings,
        );
      case "REMATCH":
        return Rematch(
          action.activePlayer,
          action.inactivePlayer,
          action.activePlayer,
          action.inactivePlayer,
          action.startingScore,
          GAME_DEFAULT_STATE,
        );
      default:
        return state;
    }
  };

  const [gameData, dispatchGameData] = useReducer(
    gameReducer,
    initialGameState,
  );

  console.log("GAMEDATA", gameData);

  return (
    <GameContext.Provider value={{ gameData, dispatchGameData }}>
      {props.children}
    </GameContext.Provider>
  );
};
