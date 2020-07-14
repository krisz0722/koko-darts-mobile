import React, { useContext, useEffect, useRef } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { GameContext } from "../../../contexts/GameContext";
import CHECKOUTS from "./ClassicPlayersCheckout";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { Animated, View } from "react-native";
import { FlexColAround, FlexColStart } from "../../../styles/css_mixins";
import PLAYER_SCORE from "./ClassicPlayerScore";

export const ClassicScores = styled(View)`
  ${FlexColAround};
  position: absolute;
  top: ${({ showStats }) => (showStats ? "10%" : "15%")};
  width: 100%;
  height: ${({ showStats }) => (showStats ? "25%" : "30%")};
`;

export const ClassicCheckouts = styled(View)`
  ${FlexColStart};
  position: absolute;
  top: 50%;
  width: 100%;
  height: 50%;
  opacity: 1;
`;

export const ClassicPlayerScore = styled(View)`
  ${FlexColStart};
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
`;

const CLASSIC_SCORES = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const {
    gameData: { showStats },
  } = useContext(GameContext);

  const theme = selectedTheme;

  const animation = useRef(new Animated.Value(0)).current;
  const checkoutAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: showStats ? 1 : 0,
      duration: 3000,
    }).start();
  }, [animation, showStats]);

  const top = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["15%", "10%"],
  });

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["30%", "25%"],
  });

  const AnimatedView = Animated.createAnimatedComponent(ClassicScores);

  return (
    <AnimatedView style={{ top, height }} showStats={showStats}>
      <ClassicCheckouts theme={theme}>
        <CHECKOUTS player={"p1"} />
        <CHECKOUTS player={"p2"} />
      </ClassicCheckouts>
      <ClassicPlayerScore showStats={showStats} theme={theme}>
        <PLAYER_SCORE player={"p1"} />
        <PLAYER_SCORE player={"p2"} />
      </ClassicPlayerScore>
    </AnimatedView>
  );
};

export default CLASSIC_SCORES;
