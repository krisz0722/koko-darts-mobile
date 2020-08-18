import moment from "moment";
import GAME_DEFAULT_STATE from "../GameDefaultState";
import { updateMatches } from "../../fb/crud";

const startNewGame = (username, settings, matches, THEMES) => {
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
    settings: {
      ...settings,
      theme: THEMES[settings.theme],
    },
    status: "pending",
    key: `${opponent} ${date2}`,
    opponent,
    date,
  };
  matches.unshift(matchToSave);
  updateMatches(username, matches);
  return matchToSave;
};

export default startNewGame;
