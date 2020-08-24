import React, { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { BasicText, FlexRow, FlexRowBetween } from "../../styles/css_mixins";
import { ThemeContext } from "../../contexts/ThemeContext";
import { GameContext } from "../../contexts/GameContext";

export const Match = styled(TouchableOpacity)`
  ${FlexRowBetween};
  width: 100%;
  margin-top: 10;
  padding: 3% 2%;
  background-color: ${({ active, theme }) =>
    active ? theme.text : "rgba(255, 255, 255, 0.1)"};
`;

export const MatchDate = styled(Text)`
  ${BasicText};
  width: 20%;
  text-align: center;
  color: ${({ active, theme }) => (active ? theme.text2 : theme.text)};
  font-size: ${({ theme }) => theme.matches.name};
`;

export const Data = styled(Text)`
  ${BasicText};
  color: ${({ active, theme }) => (active ? theme.text2 : theme.text)};
  font-size: ${({ theme }) => theme.matches.name};
  margin-right: 2%;
`;

export const Name = styled(Text)`
  ${BasicText};
  color: ${({ active, theme }) => (active ? theme.text2 : theme.text)};
  font-size: ${({ theme }) => theme.matches.name};
  margin-right: 2%;
  width: 40%;
`;

export const Result1 = styled(Name)`
  padding: 0;
  height: 100%;
  margin-right: 2%;
  color: ${({ active, theme }) => (active ? theme.text2 : theme.text)};
`;

export const Result2 = styled(Result1)`
  background-color: ${({ theme, isLeading }) =>
    isLeading ? theme.bgGreen : theme.bgRed};
  border-radius: 4px;
  color: ${({ active, theme }) => (active ? theme.text2 : theme.text)};
`;

export const MatchAvg = styled(Text)`
  ${BasicText};
  ${FlexRow};
  color: ${({ theme }) => theme.text};
  font-size: ${({ theme }) => theme.matches.name};
  color: ${({ active, theme }) => (active ? theme.text2 : theme.text)};
`;

const UNFINISHED_MATCH_COMPONENT = ({
  active,
  handleGameToContinue,
  username,
  item,
}) => {
  const { theme } = useContext(ThemeContext);
  const gameData = item.item;

  const { dispatchGameData } = useContext(GameContext);

  const {
    date,
    opponent,
    settings: { p1, legOrSet },
    p1_DATA,
    p2_DATA,
  } = gameData;
  const userData = username === p1.key ? p1_DATA : p2_DATA;
  const opponentData = username === p1.key ? p2_DATA : p1_DATA;
  const avg = userData.avgMatch;
  const legs = `${userData.legsWon} - ${opponentData.legsWon}`;
  const sets = `${userData.setsWon} - ${opponentData.setsWon}`;

  const setGameToContinue = async () => {
    const gameToContinue = { ...gameData, initializedBy: username };
    await dispatchGameData({ type: "CONTINUE_MATCH", value: gameToContinue });
    handleGameToContinue(gameToContinue);
  };

  return (
    <Match
      active={active}
      theme={theme}
      onPress={() =>
        setGameToContinue({ ...gameData, initializedBy: username })
      }
    >
      <MatchDate active={active} theme={theme}>
        {date}
      </MatchDate>
      <Name active={active}>{`vs. ${opponent}`}</Name>
      {legOrSet === "set" ? (
        <>
          <Data theme={theme} active={active}>
            {"sets"}
          </Data>
          <Data theme={theme} active={active}>
            {sets}
          </Data>
        </>
      ) : (
        <>
          <Data theme={theme} active={active}>
            {"legs"}
          </Data>
          <Data theme={theme} active={active}>
            {legs}
          </Data>
        </>
      )}

      <MatchAvg active={active} theme={theme}>{`avg: ${avg.toFixed(
        1,
      )}`}</MatchAvg>
    </Match>
  );
};

export default UNFINISHED_MATCH_COMPONENT;
