import GAME_DEFAULT_STATE from "../../GameDefaultState";

const loadSettings = (settings, THEMES) => {
  return {
    ...GAME_DEFAULT_STATE,
    settings: {
      ...settings,
      theme: THEMES[settings.theme],
    },
    p1_DATA: {
      ...GAME_DEFAULT_STATE.p1_DATA,
      score: settings.startingScore,
    },
    p2_DATA: {
      ...GAME_DEFAULT_STATE.p2_DATA,
      score: settings.startingScore,
    },
  };
};

export default loadSettings;
