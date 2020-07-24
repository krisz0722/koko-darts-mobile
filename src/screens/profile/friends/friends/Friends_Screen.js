import React, { useContext, useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { FlexCol } from "../../../../styles/css_mixins";
import Icon from "react-native-vector-icons/MaterialIcons";
import SEARCH_MODAL from "../SeearchModal";
import LIST_FRIENDS from "./ListFriends";
import { ThemeContext } from "../../../../contexts/ThemeContext";

export const AddButton = styled(TouchableOpacity)`
  ${FlexCol};
`;

const FRIENDS_SCREEN = () => {
  const { theme } = useContext(ThemeContext);

  const [searchModal, setSearchModal] = useState(false);

  const handleSendrequest = (item) => {
    alert(`Request has been sent to ${item.key}`);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LIST_FRIENDS />
      <AddButton theme={theme} onPress={() => setSearchModal(true)}>
        <Icon name={"add-circle"} color={theme.text} size={75} />
      </AddButton>
      <SEARCH_MODAL
        action1={() => setSearchModal(!searchModal)}
        action2={handleSendrequest}
        visible={searchModal}
      />
    </SafeAreaView>
  );
};

export default FRIENDS_SCREEN;
