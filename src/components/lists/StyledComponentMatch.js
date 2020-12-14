import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { FlexRowBetween, Window } from "../../styles/css_mixins";
import { P2 } from "../headers/StyledHeaders";

export const Match = styled(TouchableOpacity)`
  ${FlexRowBetween};
  width: 100%;
  margin-top: 10;
  height: ${() => Window.height * 0.06};
  padding: 2% 2%;
  background-color: rgba(255, 255, 255, 0.1);
`;

export const MatchDate = styled(P2)`
  width: 20%;
  text-align: center;
`;

export const Name = styled(P2)`
  text-align: center;
  width: 35%;
`;

export const Result1 = styled(Name)`
  width: 10%;
  padding: 0;
  height: 100%;
`;

export const Result2 = styled(Result1)`
  background-color: ${({ theme, result }) =>
    result === "W" ? theme.bgGreen : theme.bgRed};
  border-radius: 4px;
`;

export const MatchAvg = styled(P2)`
  width: 10%;
  text-align: center;
`;
