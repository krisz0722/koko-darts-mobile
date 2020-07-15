import React, { useContext } from "react";
import styled from "styled-components";
import { Text, View } from "react-native";
import {
  FlexColEnd,
  FlexCol,
  BorderHorizontal,
  BasicTextBold,
} from "../../styles/css_mixins";
import { SettingsContext } from "../../contexts/SettingsContext";
import ShapeThrow from "../../../assets/shapeThrow";
import NavButton from "../../components/buttons/NavButton";
import { NavBar } from "../../components/navigation/NavBar";

export const View_Headers = styled(View)`
  width: 100%;
  top: 15%;
  height: 35%;
  ${FlexCol};
  ${BorderHorizontal(({ theme }) => theme.borderColor)};
`;

export const View_Shape = styled(View)`
  ${FlexColEnd};
  position: absolute;
  width: 100%;
  bottom: 8%;
  height: 40%;
`;

export const Text_Title = styled(Text)`
  ${BasicTextBold}
  width: 100%;
  margin: 2% 0;
  color: ${({ theme, color }) => (color ? color : theme.text)};
  font-size: ${({ theme }) => theme.welcome.fontSize1};
  font-size: 20;
`;

export const Text_Subtitle = styled(Text_Title)`
  ${BasicTextBold};
  padding: 2.5% 5%;
  background-color: ${({ theme }) => theme.bgActive};
  color: ${({ theme }) => theme.text2};
  font-size: ${({ theme }) => theme.welcome.fontSize2};
`;

export const Text_Subtitle2 = styled(Text_Subtitle)`
  background-color: transparent;
  bottom: 0;
  color: ${({ theme }) => theme.text};
  font-size: ${({ theme }) => theme.welcome.fontSize3};
`;
