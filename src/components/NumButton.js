import React, { useContext } from "react";
import styled from "styled-components";
import { Text, TouchableHighlight } from "react-native";
import { GameContext } from "../contexts/GameContext";
import { AlignText } from "../styles/css_mixins";

export const Button_Num_Classic = styled(TouchableHighlight)`
  text-decoration: none;
  width: ${() => 100 / 3 + "%"};
  height: 25%;
  background-color: ${({ theme, ap }) => theme.game[ap + "Bg"]};
  border-color: ${({ theme, ap }) => theme.game[ap + "Border"]};
  border-width: ${({ theme }) => theme.borderWidth};
`;

export const Text_Number = styled(Text)`
  ${AlignText};
  height: 100%;
  width: 100%;
  font-family: ${({ disabled, theme }) =>
    !disabled ? theme.fontFamilyBold : theme.fontFamily};
  font-size: 35;
  color: ${({ theme, ap }) => theme.game[ap + "Text"]};
`;

const CLASSIC_NUM = ({ value }) => {
  const {
    dispatchGameData,
    gameData: { activePlayer },
  } = useContext(GameContext);

  const handleOnPress = (value) => {
    dispatchGameData({ type: "TYPE", value });
  };

  return (
    <Button_Num_Classic ap={activePlayer} onPress={() => handleOnPress(value)}>
      <Text_Number ap={activePlayer}>{value}</Text_Number>
    </Button_Num_Classic>
  );
};

export default CLASSIC_NUM;
