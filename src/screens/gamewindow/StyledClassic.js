import { Animated, View } from "react-native";
import styled from "styled-components/native";
import { Window } from "../../styles/css_mixins";

export const GameWindow = styled(View)`
  position: absolute;
  width: ${({ preview }) => (preview ? Window.width : "100%")};
  height: ${({ preview }) => (preview ? Window.height : "100%")};
  transform: ${({ preview }) => (preview ? "scale(0.32, 0.32)" : null)};
  display: ${({ visible }) => (visible ? "flex" : "none")};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
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
