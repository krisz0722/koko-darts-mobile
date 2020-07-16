import React, { useState, useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import styled from "styled-components";
import CLASSIC_SCORES from "../../components/classic/Scores/ClassicScores";
import CLASSIC_MIDDLE from "../../components/classic/Middle/ClassicMiddle";
import CLASSIC_BOTTOM from "../../components/classic/Bottom/ClassicBottom";
import CLASSIC_TOP from "../../components/classic/Top/ClassicTop";
import CLASSIC_STATS from "../../components/classic/Stats/ClassicStats";
import { Window } from "../../styles/css_mixins";

const GameWindow = styled(Animated.View)`
  position: absolute;
  width: ${() => Window.width};
  height: ${() => Window.height};
  transform: ${({ layer }) => (layer ? "scale(0.32, 0.32)" : null)};
  display: ${({ layer }) => (layer ? "flex" : "none")};
`;

const GAME_CLASSIC = ({ style, visible, layer }) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: visible ? 1 : 0,
      duration: 3000,
    }).start();
  }, [animation, visible]);

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <GameWindow style={{ opacity }} layer={layer}>
      <CLASSIC_TOP />
      <CLASSIC_SCORES />
      <CLASSIC_STATS />
      <CLASSIC_MIDDLE />
      <CLASSIC_BOTTOM />
    </GameWindow>
  );
};

export default GAME_CLASSIC;
