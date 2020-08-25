import { updateSettings } from "../../../fb/update";

const updateAuthSettings = (state, settings) => {
  const { username } = state;
  updateSettings(username, settings);
  return {
    ...state,
    settings,
  };
};

export default updateAuthSettings;
