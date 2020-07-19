import React, { useContext } from "react";
import { SafeAreaView, Text } from "react-native";
import styled from "styled-components";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { FlatList } from "react-native";
import FRIENDS_LIST from "./DataFriends";
import FRIEND_COMPONENT from "./FriendComponent";

export const FriendsContainer = styled(FlatList)`
  width: 100%;
  height: 100%;
  border-bottom-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

const LIST_FRIENDS = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const renderItem = ({ item }) => <FRIEND_COMPONENT item={item} />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FriendsContainer
        data={FRIENDS_LIST}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        theme={selectedTheme}
      />
    </SafeAreaView>
  );
};

export default LIST_FRIENDS;
