import React, { useContext, useEffect, useState } from "react";
import { BottomButtons } from "./StyledSettings";
import { SettingsContext } from "../../contexts/SettingsContext";
import { OptionsLayout } from "../../components/settings/OptionsLayout";
import { COLOR } from "../../components/settings/OptionsColor";
import { OptionsEffects } from "../../components/settings/OptionsEffects";
import { OptionsScore } from "../../components/settings/OptionsScore";
import { OptionsLegOrSet } from "../../components/settings/OptionsLegOrSet";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import PREVIEW from "../../components/settings/Preview";
import { BackHandler } from "react-native";
import { NavigationContext } from "../../contexts/NavigationContext";
import { ThemeContext } from "../../contexts/ThemeContext";

const SETTINGS = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { dispatchSettings } = useContext(SettingsContext);

  const { setHomeTabScreen } = useContext(NavigationContext);

  const [preview, setPreview] = useState(false);

  const togglePreview = () => setPreview(!preview);
  const reset = () => {
    dispatchSettings({ type: "RESET" });
  };

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("home");
      setHomeTabScreen("home");
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation, setHomeTabScreen]);

  return (
    <>
      <OptionsLayout />
      <COLOR />
      <OptionsEffects />
      <OptionsScore />
      <OptionsLegOrSet />
      <BottomButtons theme={theme}>
        <THEMED_BUTTON
          size={"small"}
          icon={"visibility"}
          text={"show preview"}
          type={"success"}
          length={2}
          action={togglePreview}
        />
        <THEMED_BUTTON
          type={"danger"}
          size={"small"}
          icon={"undo"}
          text={"reset"}
          length={2}
          action={reset}
        />
      </BottomButtons>
      {preview ? <PREVIEW preview={preview} /> : null}
    </>
  );
};

export default SETTINGS;

// TODO animation toggle, visual effecet info modal or tooltip, ASYM component, PREVIEW visibilityi icon
// TODO reset has to set the users saved settins to default in the database too
