import React, { useContext } from "react";
import { SafeAreaView } from "react-native";
import styled from "styled-components";
import { FlatList } from "react-native";
import FRIENDS_LIST from "./DataFriends";
import PROFILE_COMPONENT from "./ProfileComponent";
import { ThemeContext } from "../../../contexts/ThemeContext";
export const Safe = styled(SafeAreaView)`
  height: 40%;
  width: 100%;
  background-color: ${({ theme }) => theme.text2};
`;

export const ProfilesContainer = styled(FlatList)`
  width: 100%;
  height: 100%;
  border-bottom-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

const LIST_PROFILES = ({ regexp }) => {
  const { theme } = useContext(ThemeContext);

  const renderItem = ({ item }) => <PROFILE_COMPONENT item={item} />;

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

export default LIST_PROFILES;

//TODO filter by a regExp
