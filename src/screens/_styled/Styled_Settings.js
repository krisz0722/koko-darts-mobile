import styled from "styled-components";
import React from "react";
import {
  AlignText,
  FlexCol,
  FlexColStart,
  FlexRow,
  FlexRowAround,
  FlexRowStart,
} from "../../styles/css_mixins";
import { View, Text, TouchableHighlight } from "react-native";
import { Button } from "react-native-paper";

export const Styled_Settings = styled(View)`
  ${FlexColStart};
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export const Styled_Options = styled(View)`
  width: 100%;
  height: 60%;
  ${FlexColStart};
`;

export const Row = styled(View)`
  height: 20%;
  width: 100%;
  ${FlexCol};
  border-top-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

export const Row2 = styled(Row)`
  height: 10%;
  width: 100%;
  ${FlexRowStart};
`;

export const Header = styled(Text)`
  ${FlexRow};
  width: 100%;
  height: 50%;
  ${AlignText};
  text-transform: ${({ theme }) => theme.textTransform};
  font-family: ${({ theme }) => theme.fontFamilyBold};
  font-size: ${({ theme }) => theme.settings.fontSizeHeader};
  background-color: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.text};
`;

export const Div = styled(View)`
  ${FlexRowAround};
  width: 100%;
  height: 50%;
`;

export const Div2 = styled(View)`
  ${FlexRowAround};
  width: 100%;
  height: 100%;
  padding: 0 5%;
`;
export const Button_Settings = styled(TouchableHighlight)`
  ${FlexCol};
  background-color: ${({ theme, active }) =>
    active ? theme.bgActive : "transparent"};
  flex-basis: ${({ length }) => 100 / length + "%"};
  height: 100%;
`;
export const Button_DropDown = styled(Button_Settings)`
  ${FlexRowAround}
`;

export const Text_Button = styled(Text)`
  ${AlignText};
  ${FlexCol};
  height: 100%;
  width: 100%;
  padding: 0 10%;
  color: ${({ theme, active }) => (active ? theme.text2 : theme.text)};
  font-family: ${({ theme, active }) =>
    active ? theme.fontFamilyBold : theme.fontFamily};
  font-size: ${({ theme }) => theme.settings.fontSizeButton};
  text-transform: ${({ theme }) => theme.textTransform};
`;
