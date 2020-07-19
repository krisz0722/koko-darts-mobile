import React, { useContext } from "react";
import { SafeAreaView } from "react-native";
import styled from "styled-components";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { FlatList } from "react-native";
import MATCH_COMPONENT from "./MatchComponent";
import MATCHES_LIST from "./DataMatches";

export const MatchesContainer = styled(FlatList)`
  width: 100%;
  height: 100%;
`;

const LIST_MATCHES = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const renderItem = ({ item }) => <MATCH_COMPONENT item={item} />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MatchesContainer
        data={MATCHES_LIST}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        theme={selectedTheme}
      />
    </SafeAreaView>
  );
};

export default LIST_MATCHES;
