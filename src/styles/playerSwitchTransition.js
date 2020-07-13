import React, { useContext, useEffect, useRef } from "react";
import { Animated, Text, TouchableHighlight, View } from "react-native";
import { GameContext } from "../contexts/GameContext";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { AlignText, FlexCol, FlexRow } from "./css_mixins";
import { SettingsContext } from "../contexts/SettingsContext";

const createAnimation = (
  theme,
  animation,
  backgroundColor = false,
  color = false,
  borderColor = false,
) => {
  const newBg = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.game.p2Bg, theme.game.p1Bg],
  });

  const newBorderColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.game.p2Border, theme.game.p1Border],
  });

  const newTextColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.game.p2Text, theme.game.p1Text],
  });

  const style = {};

  if (backgroundColor) {
    style.backgroundColor = newBg;
  }

  if (color) {
    style.color = newTextColor;
  }

  if (borderColor) {
    style.borderColor = newBorderColor;
  }

  return style;
};

export default createAnimation;
