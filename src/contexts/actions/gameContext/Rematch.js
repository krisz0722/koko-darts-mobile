import GAME_DEFAULT_STATE from "../../GameDefaultState";

const Rematch = (rematch) => {
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

export default Rematch;
