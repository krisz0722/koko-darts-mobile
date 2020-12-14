import styled from "styled-components/native";
import {
  FlexColBetween,
  FlexColStart,
  FlexRow,
  FlexRowAround,
} from "../../../styles/css_mixins";
import { Animated, View } from "react-native";

export const SettingsBottom = styled(View)`
  ${FlexColBetween};
  position: absolute;
  bottom: 8%;
  width: 100%;
  height: 50%;
  border-top-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
  z-index: ${({ preview }) => (preview ? 3 : -1)};
`;

export const SettingsBottomButtons = styled(View)`
  ${FlexRowAround};
  position: absolute;
  bottom: 0;
  height: 30%;
  width: 100%;
  border-top-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

export const Row = styled(View)`
  height: 14%;
  width: 100%;
  ${FlexColStart};
  opacity: ${({ preview }) => (preview ? 0 : 1)};
  border-top-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

export const Row2 = styled(Row)`
  height: 7%;
  width: 100%;
`;

export const Div = styled(View)`
  ${FlexRowAround};
  width: 100%;
  height: 50%;
`;

export const Div2 = styled(Div)`
  height: 100%;
`;

export const SettingsHeaderContainer = styled(View)`
  ${FlexRow};
  width: 100%;
  height: ${({ header }) => (header ? "100%" : "50%")};
  background-color: rgba(255, 255, 255, 0.1);
`;

export const PreviewContainer = styled(Animated.View)`
  position: ${({ ingame }) => (ingame ? "relative" : "absolute")};
  top: ${({ ingame }) => (ingame ? "0" : "0%")};
  ${FlexRow};
  height: ${({ ingame }) => (ingame ? "40%" : "70%")};
  width: 100%;
  z-index: ${({ visible }) => (visible ? 3 : -1)};
  background-color: ${({ theme, ingame }) =>
    ingame ? "transparent" : theme.bgOverlay};
`;
