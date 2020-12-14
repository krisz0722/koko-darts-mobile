import styled from "styled-components/native";
import { Animated, View } from "react-native";
import {
  Absolute,
  FlexCol,
  FlexColStart,
  FlexRow,
} from "../../../styles/css_mixins";

export const ClassicTop = styled(Animated.View)`
  ${FlexColStart};
  ${Absolute};
  width: 100%;
`;

const PlayerInfoContainer = styled(View)`
  height: 100%;
  width: 50%;
  ${FlexCol};
  position: absolute;
  top: 0;
`;

export const PlayerInfo1 = styled(PlayerInfoContainer)`
  background-color: ${({ theme }) => theme.game.p1Bg};
  left: 0;
`;
export const PlayerInfo2 = styled(PlayerInfoContainer)`
  background-color: ${({ theme }) => theme.game.p2Bg};
  right: 0;
`;

export const PlayerInfoRow = styled(Animated.View)`
  height: 50%;
  position: absolute;
  top: 0;
  width: 100%;
  ${FlexRow};
  border-color: ${({ theme, ap }) => theme.game[ap + "Border"]};
  border-width: ${({ theme }) => theme.borderWidth};
`;
