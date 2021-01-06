import React, { useContext, useCallback, useEffect } from "react";
import { BackHandler } from "react-native";
import { GameContext } from "../../../contexts/GameContext";
import { ScreenContainer } from "../../../navigators/StyledNav";
import { AppBackground } from "../../../../App";
import { SettingsInGameBottomButtons } from "./StyledSettingsInGame";
import OPTIONS_LAYOUT from "../OptionsLayout";
import OPTIONS_EFFECT from "../OptionsEffects";
import OPTIONS_COLOR from "../OptionsColor";
import PREVIEW from "../Preview";
import THEMED_BUTTON from "../../../components/buttons/ThemedButton";

const SETTINGS_INGAME = React.memo(({ navigation }) => {
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
      {background ? (
        <AppBackground
          source={require("../../../../assets/bg.png")}
          resizeMode="cover"
        />
      ) : null}

      <ScreenContainer theme={theme}>
        <OPTIONS_LAYOUT
          layout={layout}
          toggleLayout={toggleLayout}
          ingame={true}
        />
        <OPTIONS_COLOR toggleTheme={toggleTheme} ingame={true} />
        <OPTIONS_EFFECT
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
        <SettingsInGameBottomButtons theme={theme}>
          <THEMED_BUTTON
            type={"active"}
            size={"small"}
            text={"back"}
            length={2}
            action={() => navigation.navigate("game")}
            inGameTheme={theme}
          />
        </SettingsInGameBottomButtons>
      </ScreenContainer>
    </>
  );
});

export default SETTINGS_INGAME;
