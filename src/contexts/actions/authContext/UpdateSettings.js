import { updateSettings } from "../../../_db/crudUpdate";

const updateAuthSettings = (state, settings) => {
  const { username } = state;

  return {
    ...state,
    settings,
  };
};

export default updateAuthSettings;
