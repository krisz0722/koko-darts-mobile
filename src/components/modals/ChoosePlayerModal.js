import React, { useContext } from "react";
import styled from "styled-components";
import {
  View,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import THEMED_BUTTON from "../buttons/ThemedButton";
import { BottomButtons } from "./StyledModal";
import LIST_OPPONENTS from "../lists/ListOpponents";
import {
  BasicText,
  BasicTextBold,
  FlexCol,
  Window,
} from "../../styles/css_mixins";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Authcontext } from "../../contexts/AuthContext";

export const ModalContainerSearch = styled(ScrollView)`
  background-color: rgba(255, 255, 255, 0.95);
`;

export const SearchBar = styled(TextInput)`
  ${BasicText}
  width: 80%;
  margin: auto;
  height: 10%;
  border-color: ${({ theme }) => theme.text2};
  border-radius: 30;
  border-width: 2;
  color: ${({ theme }) => theme.text2};
`;

export const Container = styled(View)`
  width: 100%;
  height: ${() => Window.height * 0.9};
  ${FlexCol};
`;

export const Header = styled(Text)`
${BasicTextBold}
height:10%;
width:100%;
margin:auto;
background-color: ${({ theme }) => theme.bg1};
color: ${({ theme }) => theme.text}
font-size:20;
`;

const CHOOSE_PLAYER_MODAL = React.memo(
  ({ p1, p2, handleModal, chooseGuest, chooseProfile, visible }) => {
    const { theme, animation } = useContext(ThemeContext);
    const {
      userData: { username },
    } = useContext(Authcontext);

    const animationType = animation
      ? theme.name === "default"
        ? "fade"
        : "slide"
      : "none";

    const opponent = p1.key === username ? p2 : p1;

    return (
      <Modal
        animationType={animationType}
        transparent={true}
        presentationStyle={"pageSheet"}
        visible={visible}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ModalContainerSearch
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps={"always"}
            theme={theme}
          >
            <Container>
              <Header>CHOOSE AN OPPONENT</Header>
              <LIST_OPPONENTS
                opponent={opponent}
                chooseProfile={chooseProfile}
              />
              <BottomButtons theme={theme}>
                <THEMED_BUTTON
                  size={"small"}
                  text={"play with guest"}
                  type={"danger"}
                  length={2}
                  action={chooseGuest}
                />
                <THEMED_BUTTON
                  size={"small"}
                  text={"choose"}
                  type={"success"}
                  length={2}
                  disabled={!p2.key || p2.key === "" || p2.key === "GUEST"}
                  action={() => handleModal(p2.key)}
                />
              </BottomButtons>
            </Container>
          </ModalContainerSearch>
        </SafeAreaView>
      </Modal>
    );
  },
);

export default CHOOSE_PLAYER_MODAL;

// TODO keyboard avoiding view... or just simply put it in a scrollview
// TODO icons and button titles
