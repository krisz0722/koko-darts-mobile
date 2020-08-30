import React, { useContext } from "react";
import { SafeAreaView } from "react-native";
import FRIEND_COMPONENT from "./ComponentFriend";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Authcontext } from "../../contexts/AuthContext";
import { FriendsContainer } from "./StyledListFriends";

const LIST_FRIENDS = () => {
  const { theme } = useContext(ThemeContext);
  const FRIENDS_LIST = useContext(Authcontext).userData.friends.filter(
    (item) => item.key !== "GUEST" && item.key !== "DELETED USER",
  );

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
