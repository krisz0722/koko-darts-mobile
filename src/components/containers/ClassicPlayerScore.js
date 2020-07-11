import styled from "styled-components/native/dist/styled-components.native.esm";
import { Text, View } from "react-native";
import { AlignText, FlexRow } from "../../styles/css_mixins";

export const ClassicCurrentScores = styled(View)`
  ${FlexRow};
  width: 100%;
  height: 100%;
  border-color: ${({ ap, theme }) => theme.game[ap + "Border"]};
  border-width: ${({ theme }) => theme.borderWidth};
`;

export const ClassicPlayerScore = styled(Text)`
  ${AlignText};
  position: absolute;
  top: 0;
  width: 50%;
  height: ${({ checkout }) => (checkout ? "50%" : "100%")};
  background-color: ${({ player, theme }) => theme.game[player + "Bg"]};
  color: ${({ player, theme }) => theme.game[player + "Text"]};
  font-size: 55;
  font-family: ${({ theme }) => theme.fontFamily};
  border-color: ${({ ap, theme }) => theme.game[ap + "Border"]};
  border-width: ${({ theme }) => theme.borderWidth};
  border-bottom-width: 0;
`;

export const ClassicPlayer1Score = styled(ClassicPlayerScore)`
  left: 0;
`;
export const ClassicPlayer2Score = styled(ClassicPlayerScore)`
  right: 0;
`;
