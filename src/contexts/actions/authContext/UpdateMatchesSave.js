import { updateMatches } from "../../../fb/crud";

const updateAuthMatchesSave = (state, matches) => {
  const { username } = state;
  updateMatches(username, matches);
  return {
    ...state,
    matches,
  };
};

export default updateAuthMatchesSave;
