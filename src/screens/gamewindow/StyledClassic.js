import React from "react";
import { Animated } from "react-native";
import styled from "styled-components";
import { Window } from "../../styles/css_mixins";

export const GameWindow = styled(Animated.View)`
  position: absolute;
  width: ${({ preview }) => (preview ? Window.width : "100%")};
  height: ${({ preview }) => (preview ? Window.height : "100%")};
  transform: ${({ preview }) => (preview ? "scale(0.32, 0.32)" : null)};
  display: ${({ preview }) => (preview ? "flex" : "none")};
`;

export const Overlay = styled(Animated.View)`
  position: absolute;
  top: 0;
  height: 45%;
  width: 50%;
`;
export const Overlay1 = styled(Overlay)`
  left: 0;
  background-color: ${({ theme }) => theme.game.p1Overlay};
`;

export const Overlay2 = styled(Overlay)`
  right: 0;
  background-color: ${({ theme }) => theme.game.p2Overlay};
`;

export const OverlayFull = styled(Animated.View)`
  position: absolute;
  z-index: ${({ active }) => (active ? 1 : -1)}
  bottom: 0;
  width: 100%;
  height: 100%;
`;
