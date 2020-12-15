import React, { useContext } from "react";
import { Modal, SafeAreaView } from "react-native";
import THEMED_BUTTON from "../buttons/ThemedButton";
import { BottomButtons } from "./StyledModal";
import LIST_OPPONENTS from "../lists/ListOpponents";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Authcontext } from "../../contexts/AuthContext";
import {
  ModalContainerSearch,
  Container,
  Header,
} from "./StyledChoosePlayerModal";

const CHOOSE_PLAYER_MODAL = React.memo(
  ({ p1, p2, handleModal, chooseGuest, chooseProfile, visible }) => {
    const {
      theme,
      themeContext: { animation },
    } = useContext(ThemeContext);
    const {
      userData: { id },
    } = useContext(Authcontext);

    const animationType = animation
      ? theme.name === "default"
        ? "fade"
        : "slide"
      : "none";

    const opponent = p1.id === id ? p2 : p1;

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
