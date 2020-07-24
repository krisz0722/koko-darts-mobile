import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Animated } from "react-native";
import {
  AlignText,
  FlexCol,
  FlexRow,
  Window,
} from "../../../styles/css_mixins";

const PLayerInfoLegSet = styled(Animated.View)`
  height: 100%;
  ${FlexRow};
  position: absolute;
  top: 0;
  border-color: ${({ theme, ap }) => theme.game[ap + "Border"]};
`;

export const LegSet1 = styled(PLayerInfoLegSet)`
  right: 0;
  border-left-width: ${({ theme }) => theme.borderWidth};
`;

export const LegSet2 = styled(PLayerInfoLegSet)`
  left: 0;
  border-right-width: ${({ theme }) => theme.borderWidth};
`;

export const Text_Main = styled(Animated.Text)`
  height: 100%;
  width: 50%;
  ${FlexCol};
  ${AlignText};
  color: ${({ player, theme }) => theme.game[player + "Text"]};
`;

const Text_Sub = styled(Text_Main)`
  font-size: 15;
`;

const LEGSET = React.memo((props) => {
  const {
    player,
    showStats,
    legsWon,
    setsWon,
    legOrSet,
    activePlayer,
    animation,
    theme,
  } = props;

  const animationValue = useRef(
    new Animated.Value(activePlayer === "p1" ? 1 : 0),
  ).current;
  const resize = useRef(new Animated.Value(showStats ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(resize, {
      toValue: showStats ? 1 : 0,
      duration: 300,
    }).start();
  }, [resize, showStats]);

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: activePlayer === "p1" ? 1 : 0,
      duration: 300,
    }).start();
  }, [animationValue, activePlayer]);

  const width = animation
    ? resize.interpolate({
        inputRange: [0, 1],
        outputRange: [
          Window.width / 2 - Window.height * 0.075,
          Window.width / 2 - Window.height * 0.05,
        ],
      })
    : showStats
    ? Window.width / 2 - Window.height * 0.05
    : Window.width / 2 - Window.height * 0.075;

  const borderColor = animation
    ? animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.game.p2Border, theme.game.p1Border],
      })
    : theme.game[activePlayer + "Border"];

  const fs1 = theme.game.legset.classic.fs1;
  const fs2 = theme.game.legset.classic.fs2;

  const fontSize = animation
    ? resize.interpolate({
        inputRange: [0, 1],
        outputRange: [fs1, fs2],
      })
    : showStats
    ? fs2
    : fs1;

  return (
    <>
      {player === "p1" ? (
        <LegSet1
          style={{ width, borderColor }}
          ap={activePlayer}
          showStats={showStats}
        >
          {legOrSet === "set" ? (
            <Text_Sub player={"p1"}>({legsWon})</Text_Sub>
          ) : null}

          <Text_Main style={{ fontSize }} player={"p1"}>
            {legOrSet === "set" ? setsWon : legsWon}
          </Text_Main>
        </LegSet1>
      ) : (
        <LegSet2
          style={{ width, borderColor }}
          ap={activePlayer}
          showStats={showStats}
        >
          <Text_Main style={{ fontSize }} player={"p2"}>
            {legOrSet === "set" ? setsWon : legsWon}
          </Text_Main>

          {legOrSet === "set" ? (
            <Text_Sub player={"p2"}>({legsWon})</Text_Sub>
          ) : null}
        </LegSet2>
      )}
    </>
  );
});

export default LEGSET;
