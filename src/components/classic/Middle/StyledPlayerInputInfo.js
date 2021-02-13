import styled from "styled-components";
import { Animated } from "react-native";
import { BasicTextBold, FlexCol } from "../../../styles/css_mixins";

export const PlayerInputInfo = styled(Animated.View)`
  ${FlexCol};
  width: ${() => 100 / 3 + "%"};
  height: 50%;
  background-color: ${({ theme, active, isInvalid }) =>
    isInvalid && active
      ? theme.bgRed
      : active
      ? theme.bgGreen
      : theme.game.middle.bgMid};
  border-color: ${({ theme, ap }) => theme.game[ap + "Border"]};
  border-width: ${({ theme }) => theme.borderWidth};
`;

export const Text_Function = styled(Animated.Text)`
  ${BasicTextBold};
  height: 50%;
  width: 100%;
  font-size: ${({ theme }) => theme.fonts.fontSizeFunction};
  color: ${({ theme }) => theme.text};
`;
