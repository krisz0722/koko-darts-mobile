import styled from "styled-components/native";
import { SafeAreaView, View } from "react-native";
import {
  BorderVertical,
  FlexCol,
  FlexRowAround,
  Window,
} from "../styles/css_mixins";

export const ScreenContainer = styled(SafeAreaView)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.bgOverlay};
`;

export const DrawerContent = styled(View)`
  ${FlexCol};
  width: 100%;
  top: 30%;
  height: 40%;
  background-color: ${({ theme, inap }) => theme.game[inap + "Bg"]};
`;

export const HomeDrawerContent = styled(View)`
  ${FlexCol};
  width: 100%;
  top: 0;
  background-color: ${({ theme }) => theme.bgOverlay};
`;

export const NavBar = styled(View)`
  ${BorderVertical(({ theme, color }) =>
    color === "dark" ? theme.bg3 : theme.borderColor,
  )};
  border-bottom-width: ${({ theme, position }) =>
    position === "top" ? theme.borderWidth : 0};
  position: ${({ position }) => (position === "top" ? "relative" : "absolute")};
  bottom: 0;
  width: 100%;
  height: ${() => Window.height * 0.08};
  ${FlexRowAround};
`;

export const TopNavBar = styled(View)`
  ${BorderVertical(({ theme, color }) =>
    color === "dark" ? theme.bg3 : theme.borderColor,
  )};
  border-bottom-width: ${({ theme, position }) =>
    position === "top" ? theme.borderWidth : 0};
  position: relative;
  width: 100%;
  height: ${() => Window.height * 0.08};
  ${FlexRowAround};
`;
