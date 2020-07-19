import React, { useContext, useState } from "react";
import styled from "styled-components";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { Modal, TextInput } from "react-native";
import {
  Header2,
  ModalContainerSearch,
} from "../../../components/modals/StyledModal";
import THEMED_BUTTON from "../../../components/buttons/ThemedButton";
import { BottomButtons } from "../../../components/modals/StyledModal";
import LIST_PROFILES from "./ListProfiles";
import { BasicText } from "../../../styles/css_mixins";
import { useScrollToTop } from "@react-navigation/native";

export const SearchBar = styled(TextInput)`
  ${BasicText}
  width: 80%;
  height: 10%;
  margin-bottom: 5%;
  border-color: ${({ theme }) => theme.text2};
  border-radius: 30;
  border-width: 2;
  color: ${({ theme }) => theme.text2};
`;

const SEARCH_MODAL = ({ action1, action2, visible }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const [regexp, setRegexp] = useState("");

  const handleRegExp = (val) => setRegexp(val);
  console.log("REGEXP", regexp);

  return (
    <Modal
      animationType={selectedTheme.name === "default" ? "fade" : "slide"}
      transparent={true}
      presentationStyle={"pageSheet"}
      visible={visible}
    >
      <ModalContainerSearch behavior="height" theme={selectedTheme}>
        <Header2>FIND YOUR FRIEND</Header2>
        <SearchBar
          placeholderTextColor={selectedTheme.borderColor}
          theme={selectedTheme}
          onChangeText={handleRegExp}
        />
        <LIST_PROFILES regexp={regexp} />
        <BottomButtons theme={selectedTheme}>
          <THEMED_BUTTON
            text={"cancel"}
            length={2}
            size={"small"}
            icon={"clear"}
            type={"danger"}
            action={() => action1()}
          />
          <THEMED_BUTTON
            size={"small"}
            text={"yes"}
            type={"success"}
            length={2}
            icon={"check"}
            action={() => action2()}
          />
        </BottomButtons>
      </ModalContainerSearch>
    </Modal>
  );
};

export default SEARCH_MODAL;

// TODO keyboard avoiding view... or just simply put it in a scrollview
