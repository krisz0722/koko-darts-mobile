import styled from "styled-components/native";
import { View, TouchableHighlight } from "react-native";
import { FlexColAround, FlexRowAround, FlexCol } from "../../styles/css_mixins";
import {
  Header1,
  Header3,
  P2_Bold,
} from "../../components/headers/StyledHeaders";

export const Players = styled(View)`
  width: 100%;
  ${FlexRowAround};
  height: 30%;
  border-bottom-width: ${({ theme, border }) =>
    !border ? 0 : theme.borderWidth};
  border-top-width: ${({ theme, border }) =>
    border === "none" ? 0 : theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

export const Main = styled(Header1)``;

export const Sub = styled(Header3)``;

export const Row = styled(View)`
  height: ${() => (100 - 65) / 8 + "%"};
  width: 100%;
  ${FlexRowAround};
  border-color: ${({ theme }) => theme.borderColor};
`;

export const Div = styled(View)`
  ${FlexColAround};
  width: ${() => 100 / 3 + "%"};
  height: 60%;
`;

export const Stat = styled(P2_Bold)`
  ${FlexColAround};
  width: 50%;
  height: 80%;
  background-color: rgba(255, 255, 255, 0.1);
`;

export const StatSide = styled(Stat)`
  width: 25%;
`;

export const Div2 = styled(View)`
  ${FlexRowAround};
  width: 100%;
  height: 40%;
`;

export const BottomButtons = styled(View)`
  ${FlexRowAround};
  position: absolute;
  bottom: 0;
  height: 12.5%;
  width: 100%;
  border-top-width: ${({ theme, border }) =>
    border === "none" ? 0 : theme.borderWidth};
  border-bottom-width: ${({ theme, border }) =>
    border === "none" ? 0 : theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

export const BottomButtons2 = styled(BottomButtons)`
  position: relative;
  height: 20%;
  width: 100%;
`;

export const Header = styled(Header3)`
  height: 15%;
  ${FlexCol};
  width: 100%;
  padding: 0 3%;
  border-bottom-width: ${({ theme, border }) =>
    border === "none" ? 0 : theme.borderWidth};
  border-top-width: ${({ theme, border }) =>
    border === "none" ? 0 : theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

export const OptionButton = styled(TouchableHighlight)`
  text-decoration: none;
  width: ${({ length }) => 100 / length + "%"};
  height: 100%;
  margin: auto;
  border-radius: 4px;
  background-color: ${({ active, theme }) =>
    active ? theme.text : "transparent"};
`;

export const OptionText = styled(Header1)`
  ${FlexCol};
  height: 100%;
  width: ${({ icon, text }) => (text === "" ? "0%" : icon ? "70%" : "100%")};
  color: ${({ theme, active }) => (active ? theme.text2 : theme.text)};
`;

export const RematchCon = styled(View)`
  ${FlexCol};
  height: 100%;
`;
