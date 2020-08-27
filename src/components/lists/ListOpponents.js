import React, { useContext } from "react";
import { SafeAreaView } from "react-native";
import styled from "styled-components";
import { FlatList } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import OPPONENT_COMPONENT from "./ComponentOpponent";
import { BorderVertical } from "../../styles/css_mixins";
import { Authcontext } from "../../contexts/AuthContext";
export const Safe = styled(SafeAreaView)`
  height: 50%;
  width: 100%;
  background-color: ${({ theme }) => theme.text2};
`;

export const ProfilesContainer = styled(FlatList)`
  width: 100%;
  height: 100%;
  border-bottom-width: ${({ theme }) => theme.borderWidth};
  ${BorderVertical(({ theme }) => theme.borderColor)}
  border-color: ${({ theme }) => theme.borderColor};
`;

const LIST_OPPONENTS = React.memo(({ opponent, chooseProfile }) => {
  const { theme } = useContext(ThemeContext);
  const {
    userData: { friends, unfinishedMatches },
  } = useContext(Authcontext);
  const FRIENDS_LIST = friends.filter((friend) => {
    const hasUnfinished = unfinishedMatches.find((match) => {
      return match.opponent === friend.key;
    });
    const isGuest = friend.key === "GUEST";
    const isDeleted = friend.key === "DELETED USER";

    return !hasUnfinished && !isGuest && !isDeleted && !friend.inGame;
  });

  const renderItem = ({ item }) => (
    <OPPONENT_COMPONENT
      opponent={opponent}
      chooseProfile={chooseProfile}
      item={item}
    />
  );

  return (
    <Safe>
      <ProfilesContainer
        data={FRIENDS_LIST}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        theme={theme}
      />
    </Safe>
  );
});

export default LIST_OPPONENTS;
