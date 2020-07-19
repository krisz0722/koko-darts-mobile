import React, { useContext, useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { FlexCol } from "../../../styles/css_mixins";
import Icon from "react-native-vector-icons/MaterialIcons";
import SEARCH_MODAL from "./SeearchModal";
import LIST_FRIENDS from "./ListFriends";

export const AddButton = styled(TouchableOpacity)`
  ${FlexCol};
`;

const FRIENDS = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const [searchModal, setSearchModal] = useState(false);

  const handleAddFriend = (item) => {
    alert(`${item.name} has been added!`);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LIST_FRIENDS />
      <AddButton theme={selectedTheme} onPress={() => setSearchModal(true)}>
        <Icon name={"add-circle"} color={selectedTheme.text} size={75} />
      </AddButton>
      <SEARCH_MODAL
        action1={() => setSearchModal(!searchModal)}
        action2={() => handleAddFriend()}
        visible={searchModal}
      />
    </SafeAreaView>
  );
};

export default FRIENDS;
