import React, { useEffect, useRef, useContext, useState } from "react";
import { Animated, BackHandler } from "react-native";
import CLASSIC_SCORES from "../../components/classic/Scores/ClassicScores";
import CLASSIC_MIDDLE from "../../components/classic/Middle/ClassicMiddle";
import CLASSIC_BOTTOM from "../../components/classic/Bottom/ClassicBottom";
import CLASSIC_TOP from "../../components/classic/Top/ClassicTop";
import CLASSIC_STATS from "../../components/classic/Stats/ClassicStats";
import { GameContext } from "../../contexts/GameContext";
import LEAVE_MATCH_ALERT from "../../components/modals/LeaveMatchAlert";
import { GameWindow, Overlay1, Overlay2 } from "./StyledClassic";
import { InGameThemeContext } from "../../contexts/InGameThemeContext";
import { InGameOpacityContext } from "../../contexts/InGameOpacityContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { OpacityContext } from "../../contexts/OpacityContext";
import { InGameSettingsContext } from "../../contexts/InGameSettingsContext";

const GAME_CLASSIC = React.memo((props) => {
  const {
    ingame = true,
    preview,
    settings,
    navigation,
    opacitySettings,
  } = props;

  const {
    gameData: {
      activePlayer,
      p1,
      p2,
      p1_DATA,
      p2_DATA,
      showStats,
      inactivePlayer,
      isLegOver,
    },
  } = useContext(GameContext);

  console.log("INGAME", ingame);

  const { inGameSettings } = useContext(InGameSettingsContext);
  const { inGameTheme, inGameAnimation } = useContext(InGameThemeContext);
  const { theme, animation } = useContext(ThemeContext);
  const { opacity } = useContext(OpacityContext);
  const { inGameOpacity } = useContext(InGameOpacityContext);

  const themeToUse = ingame ? inGameTheme : theme;
  const animationToUse = ingame ? inGameAnimation : animation;
  const opacityToUse = ingame ? inGameOpacity : opacitySettings;
  const settingsToUse = ingame ? inGameSettings : settings;

  console.log(inGameSettings, settings);
  const { legOrSet, startingScore } = settingsToUse;

  const animationValue = useRef(
    new Animated.Value(activePlayer === "p1" ? 0 : 1),
  ).current;

  const drawerValue = useRef(new Animated.Value(!drawer ? 1 : 0)).current;

  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    if (animationToUse) {
      Animated.timing(drawerValue, {
        toValue: drawer ? 1 : 0,
        duration: 300,
      }).start();
      Animated.timing(animationValue, {
        toValue: activePlayer === "p1" ? 0 : 1,
        duration: 300,
      }).start();
    }
    if (isLegOver) {
      navigation.navigate("legisfinished");
    }
  }, [
    animationToUse,
    animationValue,
    activePlayer,
    preview,
    isLegOver,
    navigation,
    drawerValue,
    drawer,
  ]);

  useEffect(() => {
    const backAction = () => {
      setModal(true);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  const handleLeaveMatch = () => {
    setModal(false);
    navigation.navigate("homenavigator");
  };

  const opacity1 = animationToUse
    ? animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.9],
      })
    : inactivePlayer === "p1"
    ? 0.9
    : 1;

  const opacity2 = animationToUse
    ? animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.9, 1],
      })
    : inactivePlayer === "p2"
    ? 0.9
    : 1;

  console.log("GAME CLASSIC");

  return (
    <GameWindow preview={preview}>
      <CLASSIC_TOP
        ingame={false}
        animation={animationToUse}
        theme={themeToUse}
        showStats={showStats}
        activePlayer={activePlayer}
        p1={p1}
        p2={p2}
        p1_DATA={p1_DATA}
        p2_DATA={p2_DATA}
        legOrSet={legOrSet}
      />
      <CLASSIC_SCORES
        ingame={false}
        animation={animationToUse}
        theme={themeToUse}
        showStats={showStats}
        activePlayer={activePlayer}
        startingScore={startingScore}
      />
      <CLASSIC_STATS
        ingame={false}
        animation={animationToUse}
        theme={themeToUse}
        showStats={showStats}
        activePlayer={activePlayer}
        p1_DATA={p1_DATA}
        p2_DATA={p2_DATA}
      />
      {opacityToUse ? (
        inactivePlayer === "p1" ? (
          <Overlay1
            ingame={false}
            style={{ opacity: opacity1 }}
            theme={inGameTheme}
          />
        ) : (
          <Overlay2
            ingame={false}
            style={{ opacity: opacity2 }}
            theme={themeToUse}
          />
        )
      ) : null}
      <CLASSIC_MIDDLE
        ingame={false}
        animation={animationToUse}
        theme={themeToUse}
        activePlayer={activePlayer}
        inactivePlayer={inactivePlayer}
        drawer={drawer}
        setDrawer={setDrawer}
      />
      <CLASSIC_BOTTOM
        animation={animationToUse}
        theme={themeToUse}
        activePlayer={activePlayer}
      />

      <LEAVE_MATCH_ALERT
        action1={() => setModal(!modal)}
        action2={handleLeaveMatch}
        visible={modal}
      />
    </GameWindow>
  );
});

export default GAME_CLASSIC;
