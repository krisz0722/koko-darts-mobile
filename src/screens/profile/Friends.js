import React, { useContext, useCallback, useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import SEARCH_MODAL from "../../components/modals/SearchModal";
import LIST_FRIENDS from "../../components/lists/ListFriends";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AddButton } from "./StyledProfile";

const Friends = () => {
  const { theme } = useContext(ThemeContext);

  const [searchModal, setSearchModal] = useState(false);

  const handleSendrequest = (item) => {
    alert(`Request has been sent to ${item.key}`);
  };

  const handleVisibility = useCallback(() => {
    setSearchModal(!searchModal);
  }, [searchModal]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LIST_FRIENDS />
      <AddButton>
        <TouchableOpacity theme={theme} onPress={() => setSearchModal(true)}>
          <Icon
            name={"add-circle"}
            color={theme.text}
            size={theme.fonts.iconLarge}
          />
        </TouchableOpacity>
      </AddButton>
      <SEARCH_MODAL
        action1={handleVisibility}
        action2={handleSendrequest}
        visible={searchModal}
      />
    </SafeAreaView>
  );
};

export default Friends;
