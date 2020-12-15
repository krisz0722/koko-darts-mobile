import React, { useContext } from "react";
import { SafeAreaView } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Authcontext } from "../../contexts/AuthContext";
import UNFINISHED_MATCH_COMPONENT from "./ComponentMatchUnfinished";
import { HeaderCon } from "../../screens/home/StyledInfo";
import { MatchesContainer } from "./StyledListUnfinishedMatches";
import { Header2 } from "../headers/StyledHeaders";

const ListUnfinishedMatches = React.memo(
  ({ gameToContinue, handleGameToContinue }) => {
    const { theme } = useContext(ThemeContext);

    const {
      userData: { unfinishedMatches },
    } = useContext(Authcontext);

    const renderItem = (unfinishedMatch) => {
      const active = gameToContinue
        ? gameToContinue.key === unfinishedMatch.item.key
        : false;
      return (
        <UNFINISHED_MATCH_COMPONENT
          active={active}
          handleGameToContinue={handleGameToContinue}
          unfinishedMatch={unfinishedMatch.item}
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
  ({ gameToContinue, handleGameToContinue, theme }) => {
    return (
      <>
        <HeaderCon theme={theme}>
          <Header2 unfinished={true}>you have unfinished matches</Header2>
        </HeaderCon>
        <ListUnfinishedMatches
          gameToContinue={gameToContinue}
          handleGameToContinue={handleGameToContinue}
        />
      </>
    );
  },
);

export default LIST_UNFINISHED_MATCHES;
