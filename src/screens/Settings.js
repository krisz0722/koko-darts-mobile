import React, { useContext } from "react";
import { BottomButtons } from "../components/containers/Settings";
import { SettingsContext } from "../contexts/SettingsContext";
import { OptionsLayout } from "../components/settings/OptionsLayout";
import { COLOR } from "../components/settings/OptionsColor";
import { OptionsEffects } from "../components/settings/OptionsEffects";
import { OptionsScore } from "../components/settings/OptionsScore";
import { OptionsLegOrSet } from "../components/settings/OptionsLegOrSet";
import SETTINGS_BUTTON_2 from "../components/settings/SettingsButton2";

export const SETTINGS = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  return (
    <>
      <OptionsLayout />
      <COLOR />
      <OptionsEffects />
      <OptionsScore />
      <OptionsLegOrSet />
      <BottomButtons theme={selectedTheme}>
        <SETTINGS_BUTTON_2 icon={"visibility"} value={"show preview"} />
        <SETTINGS_BUTTON_2 icon={"undo"} value={"reset"} />
      </BottomButtons>
    </>
  );
};
