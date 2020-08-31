import React, {
  useCallback,
  useMemo,
  useReducer,
  createContext,
  useContext,
} from "react";
import GAME_DEFAULT_STATE from "./GameDefaultState";
import finishLeg from "./actions/gameContext/FinishLeg";
import Rematch from "./actions/gameContext/Rematch";
import undo from "./actions/gameContext/Undo";
import bust from "./actions/gameContext/Bust";
import typeNextDart from "./actions/inputContext/TypeNextDart";
import submitUpdateScore from "./actions/gameContext/SubmitUpdateScore";
import UpdateByDart from "./actions/gameContext/UpdateByDart";
import { Authcontext } from "./AuthContext";
import finishMatch from "./actions/gameContext/FinishMatch";
import Theme_Default from "../styles/theme-default.json";
import Theme_Contrast from "../styles/theme-contrast.json";
import startNewGame from "./actions/gameContext/StartNewGame";
import loadSettings from "./actions/gameContext/LoadSettings";
export const GameContext = createContext({});

export const GameContextProvider = (props) => {
  const default_settings = useContext(Authcontext).userData.settings;

  const initialGameState = {
    ...GAME_DEFAULT_STATE,
    ...default_settings,
    p1_DATA: {
      ...GAME_DEFAULT_STATE.p1_DATA,
      score: "",
    },
    p2_DATA: {
      ...GAME_DEFAULT_STATE.p2_DATA,
      score: "",
    },
  };

  const THEMES = useMemo(
    () => ({
      default: Theme_Default,
      contrast: Theme_Contrast,
    }),
    [],
  );

  const gameReducer = useCallback(
    (state, action = null) => {
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
            action.byDartScore,
          );
        case "START_NEW_GAME":
          return startNewGame(action.value, THEMES);
        case "CONTINUE_MATCH":
          return action.value;
        case "LOAD_SETTINGS_AFTER_LOGIN":
          return loadSettings(action.value, THEMES);
        case "LOAD_SETTINGS":
          return loadSettings(default_settings, THEMES);
        case "RESET":
          return GAME_DEFAULT_STATE;
        case "NEXT":
          return typeNextDart(state);
        case "UNDO":
          return undo(state);
        case "BUST":
          return bust(state, action.inputContext);
        case "FINISH_LEG":
          return finishLeg(
            state,
            action.nodUsed,
            action.nodRequired,
            action.settings,
          );
        case "FINISH_MATCH":
          return finishMatch(state, action.isRematch);
        case "REMATCH":
          console.log(action.value);
          return Rematch(action.value, THEMES);
        case "CHOOSE_OPPONENT":
          return {
            ...state,
            settings: {
              ...state.settings,
              p2: action.value,
            },
          };
        case "CHANGE_LAYOUT":
          return {
            ...state,
            settings: {
              ...state.settings,
              layout: action.value,
            },
          };
        case "CHANGE_ANIMATION":
          return {
            ...state,
            settings: {
              ...state.settings,
              animation: action.value,
            },
          };
        case "CHANGE_BACKGROUND":
          return {
            ...state,
            settings: {
              ...state.settings,
              background: action.value,
            },
          };
        case "CHANGE_OPACITY":
          return {
            ...state,
            settings: {
              ...state.settings,
              opacity: action.value,
            },
          };
        case "CHANGE_THEME":
          return {
            ...state,
            settings: {
              ...state.settings,
              theme: THEMES[action.value],
            },
          };
        default:
          return state;
      }
    },
    [THEMES, default_settings],
  );

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
