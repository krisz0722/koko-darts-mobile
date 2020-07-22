import React, { useContext } from "react";
import { SafeAreaView } from "react-native";
import styled from "styled-components";
import { FlatList } from "react-native";
import FRIENDS_LIST from "./DataFriends";
import FRIEND_COMPONENT from "./FriendComponent";
import { ThemeContext } from "../../../contexts/ThemeContext";
export const FriendsContainer = styled(FlatList)`
  width: 100%;
  border-bottom-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

const LIST_FRIENDS = () => {
  const { theme } = useContext(ThemeContext);

  const renderItem = ({ item }) => <FRIEND_COMPONENT item={item} />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FriendsContainer
        data={FRIENDS_LIST}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        theme={theme}
      />
    </SafeAreaView>
  );
};

export default LIST_FRIENDS;
