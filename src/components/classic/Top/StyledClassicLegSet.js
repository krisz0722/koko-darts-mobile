import styled from "styled-components/native";
import { Animated } from "react-native";
import { AlignText, FlexCol, FlexRow } from "../../../styles/css_mixins";

const PlayerInfoLegSet = styled(Animated.View)`
  height: 100%;
  ${FlexRow};
  position: absolute;
  top: 0;
  border-color: ${({ theme, ap }) => theme.game[ap + "Border"]};
`;

export const LegSet1 = styled(PlayerInfoLegSet)`
  right: 0;
  border-left-width: ${({ theme }) => theme.borderWidth};
`;

export const LegSet2 = styled(PlayerInfoLegSet)`
  left: 0;
  border-right-width: ${({ theme }) => theme.borderWidth};
`;

export const Text_Main = styled(Animated.Text)`
  height: 100%;
  width: 50%;
  ${FlexCol};
  ${AlignText};
  color: ${({ player, theme }) => theme.game[player + "Text"]};
`;

export const Text_Sub = styled(Text_Main)`
  font-size: 15;
`;
