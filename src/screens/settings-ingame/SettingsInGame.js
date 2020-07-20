import React, { useContext, useEffect, useState } from "react";
import { BottomButtons } from "./StyledSettingsInGame";
import { SettingsContext } from "../../contexts/SettingsContext";
import { OptionsLayout } from "../../components/settings/OptionsLayout";
import { COLOR } from "../../components/settings/OptionsColor";
import { OptionsEffects } from "../../components/settings/OptionsEffects";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import PREVIEW from "../../components/settings/Preview";
import { BackHandler } from "react-native";

const SETTINGS_INGAME = ({ navigation }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("game");
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
      <OptionsLayout />
      <COLOR />
      <OptionsEffects />

      <PREVIEW preview={true} ingame={true} />
      <BottomButtons theme={selectedTheme}>
        <THEMED_BUTTON
          type={"basic"}
          size={"small"}
          icon={"dart"}
          text={"back"}
          length={2}
          action={() => navigation.navigate("game")}
        />
      </BottomButtons>
    </>
  );
};

export default SETTINGS_INGAME;

// TODO animation toggle, visual effecet info modal or tooltip, ASYM component, PREVIEW visibilityi icon
// TODO reset has to set the users saved settins to default in the database too
