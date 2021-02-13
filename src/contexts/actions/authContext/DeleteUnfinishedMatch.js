import { updateUnfinishedMatches } from "../../../_db/crudUpdateUnfinishedMatches";

const deleteMatch = (
  gameData,
  username,
  inGame,
  navigation,
  navigationType,
) => {
  const {
    key,
    settings: { p1, p2 },
  } = gameData;

  updateUnfinishedMatches(
    p1,
    p2,
    null,
    null,
    "delete",
    key,
    inGame,
    navigation,
    navigationType,
    gameData,
  );
};

export default deleteMatch;
