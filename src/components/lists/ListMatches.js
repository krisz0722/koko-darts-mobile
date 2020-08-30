import React, { useContext } from "react";
import { SafeAreaView } from "react-native";
import MATCH_COMPONENT from "./ComponentMatch";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Authcontext } from "../../contexts/AuthContext";
import { MatchesContainer } from "./StyledListMatches";

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
