import { updateUnfinishedMatches } from "../../../_db/crudUpdateUnfinishedMatches";
import GAME_DEFAULT_STATE from "../../GameDefaultState";

const updateAuthMatchesAdd = (newMatch, THEMES, navigation, navigationType) => {
  const { username, settings, date, key } = newMatch;
  const { p1, p2 } = settings;

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
        p1: { ...p1 },
        p2: { ...p2 },
        theme: THEMES[settings.theme],
      },
      status: "pending",
      key,
      opponent,
      date,
      initializedBy: username,
    };
  };

  updateUnfinishedMatches(
    p1,
    p2,
    matchToSave(p1),
    matchToSave(p2),
    "add",
    key,
    true,
    navigation,
    navigationType,
  );
};

export default updateAuthMatchesAdd;
