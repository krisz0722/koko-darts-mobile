import { updateSettings } from "../../../_backend/db/crudUpdate";

const updateAuthSettings = (state, settings) => {
  const { username } = state;

  return {
    ...state,
    settings,
  };
};

export default updateAuthSettings;
