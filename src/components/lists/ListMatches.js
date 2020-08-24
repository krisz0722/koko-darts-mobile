import React, { useContext } from "react";
import { SafeAreaView, Text, View } from "react-native";
import styled from "styled-components";
import { FlatList } from "react-native";
import MATCH_COMPONENT from "./ComponentMatch";
import { ThemeContext } from "../../contexts/ThemeContext";
import { BasicText, FlexRowBetween, Window } from "../../styles/css_mixins";
import { Authcontext } from "../../contexts/AuthContext";
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

const ListMatches = () => {
  const { theme } = useContext(ThemeContext);
  const {
    userData: { matches },
  } = useContext(Authcontext);

  const MATCHES_LIST = () => {
    return matches instanceof Array
      ? matches.filter((item) => item.status !== "pending")
      : [];
  };

  const renderItem = (item) => <MATCH_COMPONENT item={item} />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*<Header theme={theme}>*/}
      {/*<Col1>Date</Col1>*/}
      {/*<Col2>Opponent</Col2>*/}
      {/*<Col3>Result</Col3>*/}
      {/*<Col4>Avg.</Col4>*/}
      {/*<Col5></Col5>*/}
      {/*</Header>*/}
      <MatchesContainer
        data={MATCHES_LIST()}
        renderItem={(item) => renderItem(item)}
        keyExtractor={(item) => item.key}
        theme={theme}
      />
    </SafeAreaView>
  );
};

const LIST_MATCHES = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ListMatches />
    </SafeAreaView>
  );
};

export default LIST_MATCHES;
