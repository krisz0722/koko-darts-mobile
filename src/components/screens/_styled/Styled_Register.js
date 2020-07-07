import styled from "styled-components";
import { View, Text, TextInput, ScrollView } from "react-native";
import {
  Window,
  Screen,
  Resize,
  AlignText,
  FlexCol,
  FlexRow,
} from "../../../themes/css_mixins";
import { Absolute } from "../../../themes/css_mixins";

export const Scroll = styled(ScrollView)``;

export const View_TopContainer = styled(View)`
  ${FlexCol};
  padding: 0 5%;
  justify-content: flex-start;
  width: 100%;
  height: ${() => Resize(Window.height, 1)};
`;

export const View_Headers = styled(View)`
  width: 100%;
  ${FlexCol};
  height: ${() => Resize(Window.height, 0.3)};
`;

export const Form_Login = styled(View)`
  ${FlexCol};
  justify-content: space-around;
  width: 100%;
  height: ${() => Resize(Window.height, 0.5)};
`;

export const View_Inputs = styled(View)`
  width: 100%;
  height: 75%;
`;

export const Text_Title = styled(Text)`
  font-family: ${({ theme }) => theme.fontFamily};
  text-transform: ${({ theme }) => theme.textTransform};
  width: 100%;
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  font-size: 30;
  ${AlignText};
`;

export const Text_Subtitle = styled(Text_Title)`
  font-size: 20;
  margin-top: 10%;
  font-weight: 100;
`;

export const TextInput_Login = styled(TextInput)`
  height: ${() => Resize(Window.height, 0.08)};
  border-bottom-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
  border-radius: 4px;
  padding: 0 5%;
  margin: 2% 0;
  width: 100%;
  font-size: ${({ theme }) => theme.menu.fontSizeText};
  font-size: 20;
  font-family: ${({ theme }) => theme.fontFamily};
  background-color: ${({ focused, theme }) =>
    focused == true ? theme.bgActive : "transparent"};
  color: ${({ focused, theme }) =>
    focused == true ? theme.text2 : theme.text};
`;
