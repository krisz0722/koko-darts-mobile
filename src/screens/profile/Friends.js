import React, { useContext, useState } from "react";
import { SafeAreaView, View, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { FlexCol } from "../../styles/css_mixins";
import Icon from "react-native-vector-icons/MaterialIcons";
import SEARCH_MODAL from "../../components/modals/SeearchModal";
import LIST_FRIENDS from "../../components/lists/ListFriends";
import { ThemeContext } from "../../contexts/ThemeContext";

export const AddButton = styled(View)`
  ${FlexCol};
`;

const Friends = () => {
  const { theme } = useContext(ThemeContext);

  const [searchModal, setSearchModal] = useState(false);

  const handleSendrequest = (item) => {
    alert(`Request has been sent to ${item.key}`);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LIST_FRIENDS />
      <AddButton>
        <TouchableOpacity theme={theme} onPress={() => setSearchModal(true)}>
          <Icon name={"add-circle"} color={theme.text} size={75} />
        </TouchableOpacity>
      </AddButton>
      <SEARCH_MODAL
        action1={() => setSearchModal(!searchModal)}
        action2={handleSendrequest}
        visible={searchModal}
      />
    </SafeAreaView>
  );
};

export default Friends;
