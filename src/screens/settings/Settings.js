import React, { useContext } from "react";
import { BottomButtons } from "./StyledSettings";
import { SettingsContext } from "../../contexts/SettingsContext";
import { OptionsLayout } from "../../components/settings/OptionsLayout";
import { COLOR } from "../../components/settings/OptionsColor";
import { OptionsEffects } from "../../components/settings/OptionsEffects";
import { OptionsScore } from "../../components/settings/OptionsScore";
import { OptionsLegOrSet } from "../../components/settings/OptionsLegOrSet";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";

const SETTINGS = () => {
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
        <THEMED_BUTTON
          size={"small"}
          icon={"visibility"}
          text={"show preview"}
          type={"success"}
          length={2}
        />
        <THEMED_BUTTON
          type={"danger"}
          size={"small"}
          icon={"undo"}
          text={"reset"}
          length={2}
        />
      </BottomButtons>
    </>
  );
};

export default SETTINGS;
