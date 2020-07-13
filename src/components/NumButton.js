import React, { useState, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  Animated,
  Platform,
  UIManager,
  LayoutAnimation,
  Text,
  TouchableHighlight,
} from "react-native";
import { GameContext } from "../contexts/GameContext";
import { AlignText, FlexCol } from "../styles/css_mixins";
import { SettingsContext } from "../contexts/SettingsContext";

export const Button_Num_Classic = styled(TouchableHighlight)`
  text-decoration: none;
  width: ${() => 100 / 3 + "%"};
  height: 25%;
  background-color: transparent;
  border-color: ${({ theme, ap }) => theme.game[ap + "Border"]};
  border-width: ${({ theme }) => theme.borderWidth};
  ${FlexCol}
`;

export const Text_Number = styled(Text)`
  ${AlignText};
  height: 100%;
  width: 100%;
  background-color: ${({ theme, ap }) => theme.game[ap + "Bg"]};
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

  const handleType = (value) => dispatchGameData({ type: "TYPE", value });

  return (
    <Button_Num_Classic ap={activePlayer} onPress={() => handleType(value)}>
      <Text_Number ap={activePlayer}>{value}</Text_Number>
    </Button_Num_Classic>
  );
};

export default CLASSIC_NUM;
