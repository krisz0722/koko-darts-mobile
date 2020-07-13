import React, { useState, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { Animated, Text, TouchableHighlight } from "react-native";
import { GameContext } from "../contexts/GameContext";
import { AlignText, FlexCol } from "../styles/css_mixins";

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
const CLASSIC_NUM = React.memo((props) => {
  const { activePlayer, value } = props;
  const width = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    console.log("color", width);
    Animated.timing(width, {
      toValue: activePlayer === "p1" ? 100 : 200,
      duration: 5000,
    }).start();
  }, [width, activePlayer]);

  let newWidth = width;

  console.log("num");

  const styles = {
    width: { width: newWidth },
  };

  const AnimatedNum = Animated.createAnimatedComponent(Button_Num_Classic);

  return (
    <AnimatedNum style={[styles.width]} ap={activePlayer}>
      <Text_Number ap={activePlayer}>{value}</Text_Number>
    </AnimatedNum>
  );
});

export default CLASSIC_NUM;
