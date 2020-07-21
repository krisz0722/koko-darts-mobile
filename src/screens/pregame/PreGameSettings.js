import React, { useContext, useEffect } from "react";
import { BottomButtons } from "../settings/StyledSettings";
import { SettingsContext } from "../../contexts/SettingsContext";
import { OptionsScore } from "../../components/settings/OptionsScore";
import { OptionsLegOrSet } from "../../components/settings/OptionsLegOrSet";
import HISTORY from "../../components/settings/History";
import PLAYERS from "../../components/settings/Players";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import { BackHandler } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";

const PREGAME_SETTINGS = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);

  const {
    dispatchSettings,
    settings: { p1, p2 },
  } = useContext(SettingsContext);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("home");
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <>
      <PLAYERS />
      <OptionsScore />
      <OptionsLegOrSet />
      <HISTORY />
      <BottomButtons theme={theme}>
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
          action={() => {
            dispatchSettings({ type: "NEW_MATCH", p1, p2 });
            navigation.navigate("drawernavigator");
          }}
        />
      </BottomButtons>
    </>
  );
};

export default PREGAME_SETTINGS;
