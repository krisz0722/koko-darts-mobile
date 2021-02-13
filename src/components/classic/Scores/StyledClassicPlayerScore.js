import styled from "styled-components/native/dist/styled-components.native.esm";
import { Animated } from "react-native";
import { AlignText } from "../../../styles/css_mixins";

export const Text_Score = styled(Animated.Text)`
  position: absolute;
  top: 0;
  border-width: ${({ theme }) => theme.borderWidth};
  color: ${({ player, theme }) => theme.game[player + "Text"]};
  font-family: ${({ theme }) => theme.fontFamily};
  background-color: ${({ player, theme }) => theme.game[player + "Bg"]};
  width: 50%;
  margin: auto;
  ${AlignText};
`;

export const Text_Score1 = styled(Text_Score)`
  left: 0;
`;

export const Text_Score2 = styled(Text_Score)`
  right: 0;
`;
