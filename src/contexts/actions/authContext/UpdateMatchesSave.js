import { updateUnfinishedMatches } from "../../../fb/crud";

const updateAuthMatchesSave = (gameData, username, inGame) => {
  const {
    key,
    settings: { p1, p2 },
  } = gameData;

  const matchToSave = (player) => {
    const opponent = p1.key === player.key ? p2.key : p1.key;
    return {
      ...gameData,

      opponent,
      initializedBy: username,
    };
  };

  updateUnfinishedMatches(
    p1,
    p2,
    matchToSave(p1),
    matchToSave(p2),
    "save",
    key,
    inGame,
  );
};

export default updateAuthMatchesSave;
