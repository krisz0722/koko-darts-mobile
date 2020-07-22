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
import { useIsDrawerOpen } from "@react-navigation/drawer";
import { InGameThemeContext } from "../../contexts/InGameThemeContext";
import { InGameOpacityContext } from "../../contexts/InGameOpacityContext";

const GAME_CLASSIC = ({ navigation, preview }) => {
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

  const { inGameTheme, inGameAnimation } = useContext(InGameThemeContext);
  const { inGameOpacity } = useContext(InGameOpacityContext);

  const isDrawerOpen = useIsDrawerOpen();

  const [modal, setModal] = useState(false);

  const animationValue = useRef(
    new Animated.Value(activePlayer === "p1" ? 0 : 1),
  ).current;

  const drawerValue = useRef(new Animated.Value(!isDrawerOpen ? 1 : 0)).current;

  useEffect(() => {
    if (inGameAnimation) {
      Animated.timing(drawerValue, {
        toValue: isDrawerOpen ? 1 : 0,
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
    inGameAnimation,
    animationValue,
    activePlayer,
    preview,
    isLegOver,
    navigation,
    drawerValue,
    isDrawerOpen,
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

  const opacity1 = inGameAnimation
    ? animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.9],
      })
    : inactivePlayer === "p1"
    ? 0.9
    : 1;

  const opacity2 = inGameAnimation
    ? animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.9, 1],
      })
    : inactivePlayer === "p2"
    ? 0.9
    : 1;

  return (
    <GameWindow preview={preview}>
      <CLASSIC_TOP
        ingame={false}
        animation={inGameAnimation}
        theme={inGameTheme}
        showStats={showStats}
        activePlayer={activePlayer}
        p1={p1}
        p2={p2}
        p1_DATA={p1_DATA}
        p2_DATA={p2_DATA}
      />
      <CLASSIC_SCORES
        ingame={false}
        animation={inGameAnimation}
        theme={inGameTheme}
        showStats={showStats}
        activePlayer={activePlayer}
      />
      <CLASSIC_STATS
        ingame={false}
        animation={inGameAnimation}
        theme={inGameTheme}
        showStats={showStats}
        activePlayer={activePlayer}
        p1_DATA={p1_DATA}
        p2_DATA={p2_DATA}
      />
      {inGameOpacity ? (
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
            theme={inGameTheme}
          />
        )
      ) : null}
      <CLASSIC_MIDDLE
        ingame={false}
        animation={inGameAnimation}
        theme={inGameTheme}
        activePlayer={activePlayer}
        inactivePlayer={inactivePlayer}
      />
      <CLASSIC_BOTTOM
        animation={inGameAnimation}
        theme={inGameTheme}
        activePlayer={activePlayer}
      />

      <LEAVE_MATCH_ALERT
        action1={() => setModal(!modal)}
        action2={handleLeaveMatch}
        visible={modal}
      />
    </GameWindow>
  );
};

export default GAME_CLASSIC;
