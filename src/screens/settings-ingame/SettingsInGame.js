import React, { useContext, useEffect } from "react";
import { BottomButtons } from "./StyledSettingsInGame";
import { OptionsLayout } from "../settings/OptionsLayout";
import { COLOR } from "../settings/OptionsColor";
import { OptionsEffects } from "../settings/OptionsEffects";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import PREVIEW from "../settings/Preview";
import { BackHandler } from "react-native";
import { InGameThemeContext } from "../../contexts/InGameThemeContext";

const SETTINGS_INGAME = ({ navigation }) => {
  const { inGameTheme } = useContext(InGameThemeContext);

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
      <OptionsLayout ingame={true} />
      <COLOR ingame={true} />
      <OptionsEffects ingame={true} />

      <PREVIEW preview={true} ingame={true} />
      <BottomButtons theme={inGameTheme}>
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
