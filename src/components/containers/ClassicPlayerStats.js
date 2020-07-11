import styled from "styled-components/native/dist/styled-components.native.esm";
import { View } from "react-native";
import { FlexColAround, FlexRow } from "../../styles/css_mixins";

export const ClassicStats = styled(View)`
  ${FlexRow};
  width: 50%;
  position: absolute;
  top: ${({ showStats }) => (showStats ? "35%" : "45%")};
  height: 10%;
  background-color: ${({ theme, player }) => theme.game[player + "Bg"]};
`;

export const ClassicStatsPlayer1 = styled(ClassicStats)`
  left: 0;
`;

export const ClassicStatsPlayer2 = styled(ClassicStats)`
  right: 0;
  background-color: ${({ theme }) => theme.game.p2Bg};
`;

export const Averages = styled(View)`
  width: 70%;
  height: 100%;
  ${FlexColAround};
  border-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme, ap }) => theme.game[ap + "Border"]};
`;

export const Totals = styled(View)`
  width: 30%;
  height: 100%;
  ${FlexColAround};
  border-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme, ap }) => theme.game[ap + "Border"]};
`;
