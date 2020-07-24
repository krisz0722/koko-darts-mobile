import React, { useContext } from "react";
import { SafeAreaView, Text, View } from "react-native";
import styled from "styled-components";
import { FlatList } from "react-native";
import MATCH_COMPONENT from "./MatchComponent";
import MATCHES_LIST from "./DataMatches";
import { ThemeContext } from "../../../contexts/ThemeContext";
import {
  BasicText,
  BasicTextBold,
  FlexRowBetween,
  Window,
} from "../../../styles/css_mixins";
export const MatchesContainer = styled(FlatList)`
  width: 100%;
  height: 100%;
`;

export const Header = styled(View)`
  ${FlexRowBetween};
  padding: 3% 2%;
  background-color: ${({ theme }) => theme.bg1};
  border-bottom-width: 2px;
  border-color: ${({ theme }) => theme.borderColor};
`;

export const Col1 = styled(Text)`
  width: 20%;
  ${BasicText}
  color: ${({ theme }) => theme.text}
`;

export const Col2 = styled(Col1)`
  width: 35%;
`;

export const Col3 = styled(Col1)`
  width: 20%;
`;

export const Col4 = styled(Col1)`
  width: 10%;
`;
export const Col5 = styled(Col1)`
  width: ${() => Window.height * 0.03};
`;

const LIST_MATCHES = () => {
  const { theme } = useContext(ThemeContext);

  const renderItem = ({ item }) => <MATCH_COMPONENT item={item} />;

  const headerItem = {
    key: "09/07//2020",
    opponent: "opponent",
    result1: "match result",
    result2: "Win / Loss",
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header theme={theme}>
        <Col1>Date</Col1>
        <Col2>Opponent</Col2>
        <Col3>Result</Col3>
        <Col4>Avg.</Col4>
        <Col5></Col5>
      </Header>
      <MatchesContainer
        data={MATCHES_LIST}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        theme={theme}
      />
    </SafeAreaView>
  );
};

const MATCHES = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LIST_MATCHES />
    </SafeAreaView>
  );
};

export default MATCHES;
