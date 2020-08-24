import React, { useContext } from "react";
import { SafeAreaView } from "react-native";
import styled from "styled-components";
import { FlatList } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Authcontext } from "../../contexts/AuthContext";
import UNFINISHED_MATCH_COMPONENT from "./ComponentMatchUnfinished";
import { InfoTitle } from "../../screens/home/StyledHome";

export const MatchesContainer = styled(FlatList)`
  width: 100%;
  height: 100%;
  border-top-width: ${({ theme }) => theme.borderWidth};
  border-bottom-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

const ListUnfinishedMatches = React.memo(
  ({ gameToContinue, handleGameToContinue }) => {
    const { theme } = useContext(ThemeContext);

    const {
      userData: { username, unfinishedMatches },
    } = useContext(Authcontext);

    const renderItem = (item) => {
      const active = gameToContinue
        ? gameToContinue.key === item.item.key
        : false;
      return (
        <UNFINISHED_MATCH_COMPONENT
          active={active}
          handleGameToContinue={handleGameToContinue}
          username={username}
          item={item}
        />
      );
    };

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <MatchesContainer
          theme={theme}
          data={unfinishedMatches}
          renderItem={(item) => renderItem(item)}
          keyExtractor={(item) => item.key}
        />
      </SafeAreaView>
    );
  },
);

const LIST_UNFINISHED_MATCHES = React.memo(
  ({ gameToContinue, handleGameToContinue }) => {
    return (
      <>
        <InfoTitle unfinished={true}>you have unfinished matches</InfoTitle>
        <ListUnfinishedMatches
          gameToContinue={gameToContinue}
          handleGameToContinue={handleGameToContinue}
        />
      </>
    );
  },
);

export default LIST_UNFINISHED_MATCHES;
