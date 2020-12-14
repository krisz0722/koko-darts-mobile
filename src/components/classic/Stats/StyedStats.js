import styled from "styled-components/native";
import { Animated, View } from "react-native";
import { FlexColAround, FlexRowBetween } from "../../../styles/css_mixins";
import { P4 } from "../../headers/StyledHeaders";

export const ClassicStats = styled(Animated.View)`
  ${FlexRowBetween};
  width: 50%;
  position: absolute;
  height: 10%;
  top: ${({ showStats }) => (showStats ? "35%" : "45%")};
  background-color: ${({ theme, player }) => theme.game[player + "Bg"]};
`;

export const ClassicStatsPlayer1 = styled(ClassicStats)`
  left: 0;
`;

export const ClassicStatsPlayer2 = styled(ClassicStats)`
  right: 0;
  background-color: ${({ theme }) => theme.game.p2Bg};
`;

export const Averages = styled(Animated.View)`
  width: ${() => (100 / 3) * 2 + "%"};
  height: 100%;
  ${FlexColAround};
  border-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme, ap }) => theme.game[ap + "Border"]};
`;

export const Totals = styled(Animated.View)`
  width: ${() => 100 / 3 + "%"};
  height: 100%;
  ${FlexColAround};
  border-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme, ap }) => theme.game[ap + "Border"]};
`;

export const StatRow = styled(View)`
  ${FlexRowBetween};
  width: 90%;
  height: 25%;
`;

export const StatText1 = styled(P4)`
  text-align: left;
  width: 80%;
  color: ${({ theme, player }) => theme.game[player + "Text"]};
  font-family: ${({ theme }) => theme.fontFamilyBold};
  text-transform: uppercase;
`;

export const StatText2 = styled(StatText1)`
  width: 20%;
  text-align: right;
`;

export const StatText3 = styled(StatText1)`
  width: 50%;
`;

export const StatText4 = styled(StatText2)`
  width: 50%;
`;
