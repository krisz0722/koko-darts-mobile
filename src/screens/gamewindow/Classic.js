import React, { useEffect, useRef, useContext, useState } from "react";
import { Animated, BackHandler } from "react-native";
import CLASSIC_SCORES from "../../components/classic/Scores/ClassicScores";
import CLASSIC_MIDDLE from "../../components/classic/Middle/ClassicMiddle";
import CLASSIC_BOTTOM from "../../components/classic/Bottom/ClassicBottom";
import CLASSIC_TOP from "../../components/classic/Top/ClassicTop";
import CLASSIC_STATS from "../../components/classic/Stats/ClassicStats";
import { GameContext } from "../../contexts/GameContext";
import { SettingsContext } from "../../contexts/SettingsContext";
import LEAVE_MATCH_ALERT from "../../components/modals/LeaveMatchAlert";
import { GameWindow, Overlay1, Overlay2 } from "./StyledClassic";
import { useIsDrawerOpen } from "@react-navigation/drawer";

const GAME_CLASSIC = ({ navigation, preview }) => {
  const {
    gameData: { activePlayer, inactivePlayer, isLegOver },
  } = useContext(GameContext);

  const {
    settings: { selectedTheme, animation, opacity },
  } = useContext(SettingsContext);

  const isDrawerOpen = useIsDrawerOpen();

  const [modal, setModal] = useState(false);

  const animationValue = useRef(
    new Animated.Value(activePlayer === "p1" ? 0 : 1),
  ).current;

  const drawerValue = useRef(new Animated.Value(!isDrawerOpen ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(drawerValue, {
      toValue: isDrawerOpen ? 1 : 0,
      duration: 300,
    }).start();
    Animated.timing(animationValue, {
      toValue: activePlayer === "p1" ? 0 : 1,
      duration: 300,
    }).start();
    if (isLegOver) {
      navigation.navigate("legisfinished");
    }
  }, [
    animation,
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

  const opacity1 = animation
    ? animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.9],
      })
    : inactivePlayer === "p1"
    ? 0.9
    : 1;

  const opacity2 = animation
    ? animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.9, 1],
      })
    : inactivePlayer === "p2"
    ? 0.9
    : 1;

  return (
    <>
      <GameWindow preview={preview}>
        <CLASSIC_TOP />
        <CLASSIC_SCORES />
        <CLASSIC_STATS />
        {opacity ? (
          inactivePlayer === "p1" ? (
            <Overlay1 style={{ opacity: opacity1 }} theme={selectedTheme} />
          ) : (
            <Overlay2 style={{ opacity: opacity2 }} theme={selectedTheme} />
          )
        ) : null}
        <CLASSIC_MIDDLE />
        <CLASSIC_BOTTOM />

        <LEAVE_MATCH_ALERT
          action1={() => setModal(!modal)}
          action2={handleLeaveMatch}
          visible={modal}
        />
        {/*<OverlayFull active={isDrawerOpen} style={{ backgroundColor }} />*/}
      </GameWindow>
    </>
  );
};

export default GAME_CLASSIC;
