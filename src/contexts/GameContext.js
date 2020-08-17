import React, {
  useCallback,
  useReducer,
  createContext,
  useContext,
} from "react";
import GAME_DEFAULT_STATE from "./GameDefaultState";
import finishLeg from "./actions/FinishLeg";
import Rematch from "./actions/Rematch";
import undo from "./actions/Undo";
import bust from "./actions/Bust";
import typeNextDart from "./actions/TypeNextDart";
import submitUpdateScore from "./actions/SubmitUpdateScore";
import UpdateByDart from "./actions/UpdateByDart";
import { Authcontext } from "./AuthContext";
import { updateMatches } from "../fb/crud";
import moment from "moment";
export const GameContext = createContext({});

export const GameContextProvider = (props) => {
  const DEFAULT_SETTINGS = useContext(Authcontext).userData.settings;
  const MATCHES = useContext(Authcontext).userData.matches;
  const username = useContext(Authcontext).userData.username;

  const initialGameState = {
    ...GAME_DEFAULT_STATE,
    ...DEFAULT_SETTINGS,
    p1_DATA: {
      ...GAME_DEFAULT_STATE.p1_DATA,
      score: "",
    },
    p2_DATA: {
      ...GAME_DEFAULT_STATE.p2_DATA,
      score: "",
    },
  };

  const gameReducer = useCallback(
    (state, action = null) => {
      let settings;
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
        case "START_NEW_GAME":
          settings = action.value;
          const { p1, p2 } = settings;
          const opponent = p1.key === username ? p2.key : p1.key;
          const date = moment().format("MMMM Do YYYY, h:mm a");
          const date2 = moment().format("MMMM Do YYYY, h:mm a");
          const matchToSave = {
            ...GAME_DEFAULT_STATE,
            p1_DATA: {
              ...GAME_DEFAULT_STATE.p1_DATA,
              score: settings.startingScore,
            },
            p2_DATA: {
              ...GAME_DEFAULT_STATE.p2_DATA,
              score: settings.startingScore,
            },
            ...settings,
            status: "pending",
            key: `${opponent} ${date2}`,
            opponent,
            date,
          };
          MATCHES.unshift(matchToSave);
          updateMatches(username, MATCHES);
          return matchToSave;
        case "INITIALIZE_NEW_MATCH":
          settings = DEFAULT_SETTINGS;
          return {
            ...GAME_DEFAULT_STATE,
            ...settings,
            p1_DATA: {
              ...GAME_DEFAULT_STATE.p1_DATA,
              score: settings.startingScore,
            },
            p2_DATA: {
              ...GAME_DEFAULT_STATE.p2_DATA,
              score: settings.startingScore,
            },
          };
        case "CONTINUE_MATCH":
          return action.value;
        case "LOAD_SETTINGS":
          settings = action.value;

          return {
            ...GAME_DEFAULT_STATE,
            ...settings,
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
        case "SAVE_MATCH":
          return {
            ...state,
            isMatchOver: false,
          };
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
    },
    [DEFAULT_SETTINGS, MATCHES, username],
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
