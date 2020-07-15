import React, { useContext } from "react";
import { BottomButtons } from "../settings/StyledSettings";
import { SettingsContext } from "../../contexts/SettingsContext";
import { OptionsScore } from "../../components/settings/OptionsScore";
import { OptionsLegOrSet } from "../../components/settings/OptionsLegOrSet";
import HISTORY from "../../components/settings/History";
import PLAYERS from "../../components/settings/Players";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import { NavigationContext } from "../../contexts/NavigationContext";

const PREGAME_SETTINGS = ({ navigation }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const { setHomeTabScreen } = useContext(NavigationContext);

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
          type={"danger"}
          action={() => navigation.goBack()}
        />
        <THEMED_BUTTON
          size={"small"}
          text={"game on!"}
          type={"success"}
          length={2}
          icon={"dart"}
          action={() => navigation.navigate("game")}
        />
      </BottomButtons>
    </>
  );
};

export default PREGAME_SETTINGS;
