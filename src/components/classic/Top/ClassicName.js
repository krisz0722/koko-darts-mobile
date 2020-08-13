import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Animated } from "react-native";
import { AlignText, FlexRow } from "../../../styles/css_mixins";
export const Text_Name = styled(Animated.Text)`
  color: ${({ theme, player }) => theme.game[player + "Text"]};
  font-family: ${({ theme }) => theme.fontFamily};
  text-transform: uppercase;
  height: 50%;
  width: 100%;
  position: absolute;
  bottom: 0;
  ${FlexRow};
  ${AlignText};
  border-color: ${({ theme, ap }) => theme.game[ap + "Border"]};
  border-width: ${({ theme }) => theme.borderWidth};
  background-color: ${({ theme, active }) =>
    active ? theme.bgGreen : "transparent"};
`;

const NAME = React.memo((props) => {
  const { player, name, activePlayer, showStats, animation, theme } = props;

  const animationValue = useRef(
    new Animated.Value(activePlayer === "p1" ? 1 : 0),
  ).current;
  const animationValueName = useRef(new Animated.Value(showStats ? 1 : 0))
    .current;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: activePlayer === "p1" ? 1 : 0,
      duration: 300,
    }).start();
  }, [animationValue, activePlayer]);

  useEffect(() => {
    Animated.timing(animationValueName, {
      toValue: showStats ? 1 : 0,
      duration: 300,
    }).start();
  }, [showStats, animationValueName]);

  const borderColor = animation
    ? animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.game.p2Border, theme.game.p1Border],
      })
    : theme.game[activePlayer + "Border"];

  const fontSize = animation
    ? animationValueName.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.game.name.classic, theme.game.name.classic2],
      })
    : showStats
    ? theme.game.name.classic2
    : theme.game.name.classic;

  return (
    <Text_Name
      style={{ borderColor, fontSize }}
      player={player}
      ap={activePlayer}
    >
      {name}
    </Text_Name>
  );
});

export default NAME;
