import React, { useContext } from "react";
import { SafeAreaView } from "react-native";
import styled from "styled-components";
import { FlatList } from "react-native";
import MATCH_COMPONENT from "./MatchComponent";
import MATCHES_LIST from "./DataMatches";
import { ThemeContext } from "../../../contexts/ThemeContext";
export const MatchesContainer = styled(FlatList)`
  width: 100%;
  height: 100%;
`;

const LIST_MATCHES = () => {
  const { theme } = useContext(ThemeContext);

  const renderItem = ({ item }) => <MATCH_COMPONENT item={item} />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
