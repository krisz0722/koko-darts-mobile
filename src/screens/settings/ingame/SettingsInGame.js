import React, { useContext, useCallback, useEffect } from "react";
import { BottomButtons } from "./StyledSettingsInGame";
import { OptionsLayout } from "../OptionsLayout";
import { OptionsEffects } from "../OptionsEffects";
import THEMED_BUTTON from "../../../components/buttons/ThemedButton";
import PREVIEW from "../Preview";
import { BackHandler } from "react-native";
import { COLOR } from "../OptionsColor";
import { GameContext } from "../../../contexts/GameContext";
import { ScreenContainer } from "../../../navigators/AppNavigator";
import { AppBackground } from "../../../../App";

const SETTINGS_INGAME = ({ navigation }) => {
  const { dispatchGameData, gameData } = useContext(GameContext);
  const inGameSettings = gameData.settings;

  const { opacity, layout, animation, background, theme } = inGameSettings;

  const toggleLayout = useCallback(
    (value) => {
      dispatchGameData({ type: "CHANGE_LAYOUT", value });
    },
    [dispatchGameData],
  );

  const toggleTheme = useCallback(
    (value) => {
      dispatchGameData({ type: "CHANGE_THEME", value });
    },
    [dispatchGameData],
  );

  const toggleAnimation = useCallback(() => {
    dispatchGameData({ type: "CHANGE_ANIMATION", value: !animation });
  }, [dispatchGameData, animation]);

  const toggleBackground = useCallback(() => {
    dispatchGameData({ type: "CHANGE_BACKGROUND", value: !background });
  }, [dispatchGameData, background]);

  const toggleOpacity = useCallback(() => {
    dispatchGameData({ type: "CHANGE_OPACITY", value: !opacity });
  }, [dispatchGameData, opacity]);

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
      <AppBackground
        source={require("../../../../assets/bg.png")}
        resizeMode="cover"
      />
      <ScreenContainer theme={theme}>
        <OptionsLayout
          layout={layout}
          toggleLayout={toggleLayout}
          ingame={true}
        />
        <COLOR toggleTheme={toggleTheme} ingame={true} />
        <OptionsEffects
          background={background}
          animation={animation}
          opacity={opacity}
          toggleAnimation={toggleAnimation}
          toggleOpacity={toggleOpacity}
          toggleBackground={toggleBackground}
          ingame={true}
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
            type={"active"}
            size={"small"}
            text={"back"}
            length={2}
            action={() => navigation.navigate("game")}
            inGameTheme={theme}
          />
        </BottomButtons>
      </ScreenContainer>
    </>
  );
};

export default SETTINGS_INGAME;
