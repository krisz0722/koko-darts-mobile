import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { FlexRowBetween } from "../../styles/css_mixins";
import { P2 } from "../headers/StyledHeaders";

export const Match = styled(TouchableOpacity)`
  ${FlexRowBetween};
  width: 100%;
  margin-top: 10;
  padding: 3% 2%;
  background-color: ${({ active, theme }) =>
    active ? theme.text : "rgba(255, 255, 255, 0.1)"};
`;

export const MatchDate = styled(P2)`
  width: 20%;
  text-align: center;
  color: ${({ active, theme }) => (active ? theme.text2 : theme.text)};
`;

export const Data = styled(P2)`
  color: ${({ active, theme }) => (active ? theme.text2 : theme.text)};
  margin-right: 2%;
`;

export const Name = styled(P2)`
  color: ${({ active, theme }) => (active ? theme.text2 : theme.text)};
  margin-right: 2%;
  width: 40%;
`;

export const Result1 = styled(Name)``;

export const Result2 = styled(Result1)`
  background-color: ${({ theme, isLeading }) =>
    isLeading ? theme.bgGreen : theme.bgRed};
  border-radius: 4px;
`;

export const ClearButton = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.bgRed};
  border-radius: 4px;
  margin-left: 2%;
`;

export const MatchAvg = styled(P2)`
  color: ${({ active, theme }) => (active ? theme.text2 : theme.text)};
`;
