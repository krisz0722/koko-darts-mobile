import { updateSettings } from "../../../fb/crud";

const updateAuthSettings = (state, settings) => {
  const { username } = state;
  updateSettings(username, settings);
  return {
    ...state,
    settings,
  };
};

export default updateAuthSettings;
