import React, { useContext, useEffect, useRef } from "react";
import { GameContext } from "../../../contexts/GameContext";
import styled from "styled-components";
import { View, Text, Animated } from "react-native";
import {
  AlignText,
  FlexCol,
  FlexRow,
  Window,
} from "../../../styles/css_mixins";
import { SettingsContext } from "../../../contexts/SettingsContext";

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

export const PlayerLegSet = styled(View)`
  height: 100%;
  width: 50%;
  ${FlexCol};
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

const LEGSET = ({ player }) => {
  const {
    gameData: { showStats, legOrSet, activePlayer, p1_DATA },
  } = useContext(GameContext);

  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const theme = selectedTheme;

  const animation = useRef(new Animated.Value(activePlayer === "p1" ? 1 : 0))
    .current;
  const resize = useRef(new Animated.Value(showStats ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(resize, {
      toValue: showStats ? 1 : 0,
      duration: 300,
    }).start();
  }, [resize, showStats]);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: activePlayer === "p1" ? 1 : 0,
      duration: 300,
    }).start();
  }, [animation, activePlayer]);

  const width = resize.interpolate({
    inputRange: [0, 1],
    outputRange: [
      Window.width / 2 - Window.height * 0.075,
      Window.width / 2 - Window.height * 0.05,
    ],
  });

  const borderColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.game.p2Border, theme.game.p1Border],
  });

  const fontSize = resize.interpolate({
    inputRange: [0, 1],
    outputRange: [25, 20],
  });

  return (
    <>
      {player === "p1" ? (
        <LegSet1
          style={{ width, borderColor }}
          ap={activePlayer}
          showStats={showStats}
        >
          <Text_Sub player={"p1"}>({p1_DATA.legsWon})</Text_Sub>
          <Text_Main style={{ fontSize }} player={"p1"}>
            {legOrSet === "set" ? p1_DATA.setsWon : p1_DATA.legsWon}
          </Text_Main>
        </LegSet1>
      ) : (
        <LegSet2
          style={{ width, borderColor }}
          ap={activePlayer}
          showStats={showStats}
        >
          <Text_Main style={{ fontSize }} player={"p2"}>
            {legOrSet === "set" ? p1_DATA.setsWon : p1_DATA.legsWon}
          </Text_Main>
          <Text_Sub player={"p2"}>({p1_DATA.legsWon})</Text_Sub>
        </LegSet2>
      )}
    </>
  );
};

export default LEGSET;