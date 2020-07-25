import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { BasicText, FlexRowBetween, Window } from "../../styles/css_mixins";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ThemeContext } from "../../contexts/ThemeContext";
export const Match = styled(View)`
  ${FlexRowBetween};
  width: 100%;
  margin-top: 10;
  padding: 3% 2%;
  background-color: rgba(255, 255, 255, 0.1);
`;

export const MatchDate = styled(Text)`
  ${BasicText};
  width: 20%;
  text-align: center;
  color: ${({ theme }) => theme.text};
  font-size: ${({ theme }) => theme.matches.name};
`;

export const Name = styled(Text)`
  ${BasicText};  
  text-align: center;
  color: ${({ theme }) => theme.text}
  width: 35%;
  font-size: ${({ theme }) => theme.matches.name};
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

export const MatchAvg = styled(Text)`
  ${BasicText};
  width: 10%;
  text-align: center;
  color: ${({ theme }) => theme.text};
  font-size: ${({ theme }) => theme.matches.name};
`;

const MATCH_COMPONENT = ({ item }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Match theme={theme}>
      <MatchDate theme={theme}>{item.key}</MatchDate>

      <Name>{item.opponent}</Name>
      <Result1>{item.result1}</Result1>

      <Result2 theme={theme} result={item.result2}>
        {item.result2}
      </Result2>
      <MatchAvg theme={theme}>152.2</MatchAvg>
      <TouchableOpacity onPress={() => alert("remove friend")}>
        <Icon name={"remove"} color={theme.bgRed} size={Window.height * 0.03} />
      </TouchableOpacity>
    </Match>
  );
};

export default MATCH_COMPONENT;
