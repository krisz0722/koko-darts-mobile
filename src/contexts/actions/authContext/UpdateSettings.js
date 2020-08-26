import { updateSettings } from "../../../_backend/db/crudUpdate";

const updateAuthSettings = (state, settings) => {
  const { username } = state;
  updateSettings(username, settings);
  return {
    ...state,
    settings,
  };
};

export default updateAuthSettings;
