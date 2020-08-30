import styled from "styled-components";
import { View, Image, TouchableHighlight } from "react-native";
import {
  Border,
  Window,
  FlexColAround,
  FlexRowAround,
} from "../../styles/css_mixins";
import { Header4 } from "../headers/StyledHeaders";

export const Players = styled(View)`
  width: 100%;
  ${FlexRowAround};
  height: 30%;
  border-bottom-width: ${({ theme, border }) =>
    border === "none" ? 0 : theme.borderWidth};
  border-top-width: ${({ theme, border }) =>
    border === "none" ? 0 : theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

export const PlayerInfo = styled(TouchableHighlight)`
  width:50%;
  background-color:${({ active, theme }) =>
    active ? theme.text : "transparent"}
  height: 100%;
  ${FlexColAround};
`;

export const PlayerInfo2 = styled(PlayerInfo)`
  height: 50%;
`;

export const Avatar = styled(Image)`
  width: ${({ large }) => (large ? Window.width * 0.3 : Window.width * 0.25)};
  height: ${({ large }) => (large ? Window.width * 0.3 : Window.width * 0.25)};
  border-radius: 4px;
  ${Border(({ theme, active }) => (active ? theme.text2 : theme.text))};
`;

export const Name = styled(Header4)`
  color: ${({ theme, active }) => (active ? theme.text2 : theme.text)};
`;
