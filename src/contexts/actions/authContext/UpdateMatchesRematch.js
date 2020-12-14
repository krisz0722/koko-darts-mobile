import GAME_DEFAULT_STATE from "../../GameDefaultState";
import navigatingIn from "../../../utils/navigatingIn";
import navigatingOut from "../../../utils/navigatingOut";
import fetchPost from "../../../utils/fetchPost";

const updateAuthMatchesRematch = async (
  rematch,
  navigation,
  navigationType,
) => {
  const {
    username,
    activePlayer,
    inactivePlayer,
    startingScore,
    settings,
    opponent,
    date,
    key,
  } = rematch;

  const matchToSave = () => {
    return {
      ...GAME_DEFAULT_STATE,

      settings: {
        ...settings,
        p1: activePlayer,
        p2: inactivePlayer,
        theme: settings.theme,
      },
      status: "pending",
      activePlayer: "p1",
      inactivePlayer: "p2",
      rematchInitiated: false,
      p1_DATA: {
        ...GAME_DEFAULT_STATE.p1_DATA,
        score: startingScore,
      },
      p2_DATA: {
        ...GAME_DEFAULT_STATE.p2_DATA,
        score: startingScore,
      },
      key,
      opponent,
      date,
      initializedBy: username,
    };
  };

  navigatingIn(navigation, navigationType);

  await fetchPost("api/updateunfinishedmatches", {
    p1: activePlayer,
    p2: inactivePlayer,
    p1Match: matchToSave(activePlayer),
    p2Match: matchToSave(inactivePlayer),
    type: "add",
    key: key,
    inGame: true,
    gameData: rematch,
  });
  navigatingOut(navigation, navigationType, rematch);
};

export default updateAuthMatchesRematch;
