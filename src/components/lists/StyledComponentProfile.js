import { Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { FlexRowAround, Window } from "../../styles/css_mixins";
import { P1 } from "../headers/StyledHeaders";

export const Opponent = styled(TouchableOpacity)`
  ${FlexRowAround};

  padding: 2.5% 10%;
  background-color: ${({ theme, active }) =>
    active ? theme.bgActive : "transparent"};
`;

export const OpponentAvatar = styled(Image)`
  width: ${() => Window.height * 0.06};
  height: ${() => Window.height * 0.06};
  border-radius: ${() => Window.height * 0.075};
  border-width: ${({ theme }) => theme.borderWidth}
  border-color: ${({ theme }) => theme.text}
  margin-right:10%;
`;

export const Name = styled(P1)`
  text-align:left;
  color: ${({ theme, active }) => (active ? theme.text2 : theme.text)}
  width: 75%;
`;
