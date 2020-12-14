import styled from "styled-components/native";
import {
  FlexColStart,
  FlexRowAround,
  FlexRowStart,
} from "../../../styles/css_mixins";
import { View } from "react-native";

export const SettingsInGameBottomButtons = styled(View)`
  ${FlexRowAround};
  height: 15%;
  width: 100%;
  border-top-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

export const Row = styled(View)`
  height: ${({ header }) => (header ? "7%" : "14%")};
  width: 100%;
  ${FlexColStart};
  border-top-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

export const Row2 = styled(Row)`
  height: 7%;
  width: 100%;
  ${FlexRowStart};
`;

export const Div = styled(View)`
  ${FlexRowAround};
  width: 100%;
  height: 50%;
`;
