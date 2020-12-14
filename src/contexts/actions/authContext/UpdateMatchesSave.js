import fetchPost from "../../../utils/fetchPost";

const updateAuthMatchesSave = async (gameData, username, inGame) => {
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

  await fetchPost("api/updateunfinishedmatches", {
    p1,
    p2,
    p1Match: matchToSave(p1),
    p2Match: matchToSave(p2),
    type: "save",
    key,
    inGame,
    gameData: null,
  });
};

export default updateAuthMatchesSave;
