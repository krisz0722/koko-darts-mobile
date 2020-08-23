import { updateMatches } from "../../../fb/crud";

const updateAuthMatchesSave = (userData, gameData) => {
  const { username } = userData;

  const {
    settings: { p1, p2 },
  } = gameData;
  updateMatches(username, gameData);
};

export default updateAuthMatchesSave;
