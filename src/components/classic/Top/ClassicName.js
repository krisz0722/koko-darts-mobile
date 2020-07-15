import React, { useContext, useEffect, useRef } from "react";
import { GameContext } from "../../../contexts/GameContext";
import styled from "styled-components";
import { Animated, Text, View } from "react-native";
import { AlignText, FlexRow } from "../../../styles/css_mixins";
import { SettingsContext } from "../../../contexts/SettingsContext";

export const Text_Name = styled(Animated.Text)`
  color: ${({ theme, player }) => theme.game[player + "Text"]};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 20;
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

const NAME = ({ player }) => {
  const {
    gameData,
    gameData: { activePlayer },
  } = useContext(GameContext);

  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const theme = selectedTheme;

  const animation = useRef(new Animated.Value(activePlayer === "p1" ? 1 : 0))
    .current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: activePlayer === "p1" ? 1 : 0,
      duration: 300,
    }).start();
  }, [animation, activePlayer]);

  const borderColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.game.p2Border, theme.game.p1Border],
  });

  return (
    <Text_Name style={{ borderColor }} player={player} ap={activePlayer}>
      {gameData[player]}
    </Text_Name>
  );
};

export default NAME;