import styled from "styled-components/native";
import {
  FlexColAround,
  FlexColBetween,
  FlexRowEnd,
} from "../../styles/css_mixins";
import { View } from "react-native";

export const HomeContainer = styled(View)`
  position: absolute;
  top: 10%;
  width: 100%;
  height: 80%;
`;

export const TopBar = styled(View)`
  top: 0;
  position: absolute;
  height: ${({ friendRequestReceived }) =>
    friendRequestReceived ? "10%" : "7.5%"};
  width: ${({ friendRequestReceived }) =>
    friendRequestReceived ? "100%" : "100%"};
  ${FlexRowEnd};
  background-color: ${({ theme, friendRequestReceived }) =>
    friendRequestReceived ? theme.bg2 : "transparent"};
  border-bottom-width: ${({ theme, friendRequestReceived }) =>
    friendRequestReceived ? theme.borderWidth : 0};
  border-color: ${({ theme }) => theme.borderColor};
  flex-direction: ${({ friendRequestReceived }) =>
    friendRequestReceived ? "column" : "row"};
`;

export const HeaderCon = styled(View)`
  height: 20%;
  width: 100%;
  ${FlexColAround};
`;

export const Buttons = styled(View)`
  ${FlexColBetween};
  width: 100%;
  height: 37.5%;
`;
