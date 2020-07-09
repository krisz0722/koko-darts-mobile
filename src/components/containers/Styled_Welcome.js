import styled from "styled-components";
import { View, Text } from "react-native";
import {
  FlexColEnd,
  JustifyText,
  FlexColAround,
} from "../../styles/css_mixins";

export const View_Headers = styled(View)`
  width: 100%;
  height: 30%;
  position: absolute;
  top: 20%;
  ${FlexColAround};
`;

export const Text_Title = styled(Text)`
  font-family: ${({ theme }) => theme.fontFamilyBold};
  text-transform: ${({ theme }) => theme.textTransform};
  width: 100%;
  color: ${({ theme }) => theme.text};
  font-size: 25;
  ${JustifyText};
  padding: 0 5%;
`;

export const Text_Subtitle = styled(Text_Title)`
  font-family: ${({ theme }) => theme.fontFamily};
  margin-top: 10%;
  padding: 2% 5%;
  background-color: ${({ theme }) => theme.bgActive};
  color: ${({ theme }) => theme.text2};
  font-weight: ${({ theme }) => theme.fontFamilyBold};
  font-size: 12.5;
  font-weight: 100;
`;

export const Text_Subtitle2 = styled(Text_Subtitle)`
  padding: 0 10%;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  font-size: 12;
`;

export const View_Shape = styled(View)`
  ${FlexColEnd};
  position: absolute;
  width: 100%;
  bottom: 10%;
  height: 40%;
`;
