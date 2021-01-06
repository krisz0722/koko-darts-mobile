import GAME_DEFAULT_STATE from "../../GameDefaultState";

const startNewGame = (newMatch, THEMES) => {
  const { date, key, id, username, settings } = newMatch;

  const { p1, p2 } = settings;
  const opponent = p1.id === id ? p2 : p1;
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
      p1: { ...p1 },
      p2: { ...p2 },
      theme: THEMES[settings.theme],
    },
    status: "pending",
    key,
    opponent,
    date,
    initializedBy: id,
  };
  return matchToSave;
};

export default startNewGame;
