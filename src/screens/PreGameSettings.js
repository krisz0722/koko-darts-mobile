import React, { useContext } from "react";
import { BottomButtons } from "../components/containers/Settings";
import { SettingsContext } from "../contexts/SettingsContext";
import { OptionsScore } from "../components/settings/OptionsScore";
import { OptionsLegOrSet } from "../components/settings/OptionsLegOrSet";
import HISTORY from "../components/settings/History";
import PLAYERS from "../components/settings/Players";
import THEMED_BUTTON from "../components/ThemedButton";

const PREGAME_SETTINGS = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  return (
    <>
      <PLAYERS />
      <OptionsScore />
      <OptionsLegOrSet />
      <HISTORY />
      <BottomButtons theme={selectedTheme}>
        <THEMED_BUTTON
          text={"back"}
          length={2}
          size={"small"}
          icon={"arrow-back"}
        />
        <THEMED_BUTTON
          size={"small"}
          text={"game on!"}
          length={2}
          icon={"dart"}
        />
      </BottomButtons>
    </>
  );
};

export default PREGAME_SETTINGS;
