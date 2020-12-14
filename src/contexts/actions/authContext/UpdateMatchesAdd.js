import GAME_DEFAULT_STATE from "../../GameDefaultState";
import navigatingIn from "../../../utils/navigatingIn";
import navigatingOut from "../../../utils/navigatingOut";
import fetchPost from "../../../utils/fetchPost";

const updateAuthMatchesAdd = async (
  newMatch,
  THEMES,
  navigation,
  navigationType,
) => {
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

  navigatingIn(navigation, navigationType);
  await fetchPost("api/updateunfinishedmatches", {
    p1,
    p2,
    p1Match: matchToSave(p1),
    p2Match: matchToSave(p2),
    type: "add",
    key: key,
    inGame: true,
    gameData: null,
  });

  navigatingOut(navigation, navigationType);
};

export default updateAuthMatchesAdd;
