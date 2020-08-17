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

const LIST_OPPONENTS = ({ opponent, chooseProfile, regexp }) => {
  const { theme } = useContext(ThemeContext);
  const FRIENDS_LIST = useContext(Authcontext).userData.friends;

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
};

export default LIST_OPPONENTS;

//TODO filter by a regExp
