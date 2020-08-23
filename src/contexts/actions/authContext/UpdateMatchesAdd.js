import { updateUnfinishedMatches } from "../../../fb/crud";
import moment from "moment";
import GAME_DEFAULT_STATE from "../../GameDefaultState";

const updateAuthMatchesAdd = (userData, settings, THEMES) => {
  const { p1, p2 } = settings;

  const date = moment().format("MM-DD-YYYY");
  const date2 = moment().format("MMMM Do YYYY, h:mm a");

  const matchToSave = (player) => {
    const opponent = p1.key === player.key ? p2.key : p1.key;
    return {
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
      key: `${p1.key} vs ${p2.key} - ${date2}`,
      opponent,
      date,
    };
  };

  updateUnfinishedMatches(p1, p2, matchToSave(p1), matchToSave(p2));
};

export default updateAuthMatchesAdd;
