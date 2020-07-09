import React, { useContext } from "react";
import { Styled_Options } from "./_styled/Styled_Settings";
import { SettingsContext } from "../contexts/SettingsContext";
import { Styled_Settings } from "./_styled/Styled_Settings";
import { LAYOUT } from "./settings/Layout";
import { COLOR } from "./settings/Color";
import { EFFECTS } from "./settings/Effects";
import { GAMESETTINGS1 } from "./settings/GameSettings1";
import { GAMESETTINGS2 } from "./settings/GameSettings2";
import { NAVBAR } from "./settings/Navbar";

export const SETTINGS = () => {
  const {
    settings: {
      selectedTheme: { settings },
    },
  } = useContext(SettingsContext);

  return (
    <Styled_Settings theme={settings}>
      <Styled_Options>
        <LAYOUT />
        <COLOR />
        <EFFECTS />
        <GAMESETTINGS1 />
        <GAMESETTINGS2 />
      </Styled_Options>
      {/*<GAME_SETTINGS_PREVIEW />*/}
      <NAVBAR />
    </Styled_Settings>
  );
};
