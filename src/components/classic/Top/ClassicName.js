import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Animated } from "react-native";
import { AlignText, FlexRow } from "../../../styles/css_mixins";
export const Text_Name = styled(Animated.Text)`
  color: ${({ theme, player }) => theme.game[player + "Text"]};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.game.name.classic};
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
  const { player, name, activePlayer, animation, theme } = props;

  const animationValue = useRef(
    new Animated.Value(activePlayer === "p1" ? 1 : 0),
  ).current;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: activePlayer === "p1" ? 1 : 0,
      duration: 300,
    }).start();
  }, [animationValue, activePlayer]);

  const borderColor = animation
    ? animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.game.p2Border, theme.game.p1Border],
      })
    : theme.game[activePlayer + "Border"];

  return (
    <Text_Name style={{ borderColor }} player={player} ap={activePlayer}>
      {name}
    </Text_Name>
  );
});

export default NAME;
