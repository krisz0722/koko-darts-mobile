import React, { useEffect, useRef, useContext } from "react";
import { Alert, Animated, BackHandler } from "react-native";
import styled from "styled-components";
import CLASSIC_SCORES from "../../components/classic/Scores/ClassicScores";
import CLASSIC_MIDDLE from "../../components/classic/Middle/ClassicMiddle";
import CLASSIC_BOTTOM from "../../components/classic/Bottom/ClassicBottom";
import CLASSIC_TOP from "../../components/classic/Top/ClassicTop";
import CLASSIC_STATS from "../../components/classic/Stats/ClassicStats";
import { Window } from "../../styles/css_mixins";
import { GameContext } from "../../contexts/GameContext";
import { SettingsContext } from "../../contexts/SettingsContext";

const GameWindow = styled(Animated.View)`
  position: absolute;
  width: ${({ preview }) => (preview ? Window.width : "100%")};
  height: ${({ preview }) => (preview ? Window.height : "100%")};
  transform: ${({ preview }) => (preview ? "scale(0.32, 0.32)" : null)};
  display: ${({ preview }) => (preview ? "flex" : "none")};
`;

const Overlay = styled(Animated.View)`
  position: absolute;
  top: 0;
  height: 45%;
  width: 50%;
`;
const Overlay1 = styled(Overlay)`
  left: 0;
  background-color: ${({ theme }) => theme.game.p1Overlay};
`;

const Overlay2 = styled(Overlay)`
  right: 0;
  background-color: ${({ theme }) => theme.game.p2Overlay};
`;

const GAME_CLASSIC = ({ navigation, preview }) => {
  const {
    gameData: { inactivePlayer, isLegOver },
  } = useContext(GameContext);

  const {
    settings: { selectedTheme, animation, opacity },
  } = useContext(SettingsContext);

  const animationValue = useRef(
    new Animated.Value(inactivePlayer === "p1" ? 1 : 0),
  ).current;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: inactivePlayer === "p1" ? 1 : 0,
      duration: 3000,
    }).start();
    if (isLegOver) {
      navigation.navigate("legisfinished");
    }
  }, [
    animation,
    animationValue,
    inactivePlayer,
    preview,
    isLegOver,
    navigation,
  ]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "LEAVING MATCH",
        "Are you sure you want to leave the match? (It will be saved, you can continue it later.) ",
        [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          {
            text: "YES",
            onPress: () => {
              alert("match is being saved");
              navigation.navigate("homenavigator");
            },
          },
        ],
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

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
    </GameWindow>
  );
};

export default GAME_CLASSIC;

// TODO BACKHANDLING!!
