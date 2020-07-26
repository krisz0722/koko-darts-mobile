import React, { useContext, useCallback, useEffect } from "react";
import { BottomButtons } from "./StyledSettingsInGame";
import { OptionsLayout } from "../settings/OptionsLayout";
import { OptionsEffects } from "../settings/OptionsEffects";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import PREVIEW from "../settings/Preview";
import { BackHandler } from "react-native";
import { InGameSettingsContext } from "../../contexts/InGameSettingsContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { COLOR } from "../settings/OptionsColor";

const SETTINGS_INGAME = ({ navigation }) => {
  const {
    inGameSettings,
    inGameSettings: { opacity, layout, animation },
    dispatchInGameSettings,
  } = useContext(InGameSettingsContext);

  const { theme } = useContext(ThemeContext);

  const toggleLayout = useCallback(
    (value) => {
      dispatchInGameSettings({ type: "CHANGE_LAYOUT", value });
    },
    [dispatchInGameSettings],
  );

  const toggleAnimation = useCallback(() => {
    dispatchInGameSettings({ type: "CHANGE_ANIMATION", value: !animation });
  }, [dispatchInGameSettings, animation]);

  const toggleOpacity = useCallback(() => {
    dispatchInGameSettings({ type: "CHANGE_OPACITY", value: !opacity });
  }, [dispatchInGameSettings, opacity]);

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
      <OptionsLayout
        layout={layout}
        toggleLayout={toggleLayout}
        ingame={true}
      />
      <COLOR />
      <OptionsEffects
        showBackground={false}
        animation={animation}
        opacity={opacity}
        toggleAnimation={toggleAnimation}
        toggleOpacity={toggleOpacity}
      />

      <PREVIEW
        animation={animation}
        settings={inGameSettings}
        preview={true}
        ingame={true}
        layout={layout}
      />
      <BottomButtons theme={theme}>
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
