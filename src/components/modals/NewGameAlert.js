import React, { useContext } from "react";
import { Modal } from "react-native";
import THEMED_BUTTON from "../buttons/ThemedButton";
import { BottomButtons } from "./StyledModal";
import { Header2, Header3, Header4, ModalContainerAlert } from "./StyledModal";
import { ThemeContext } from "../../contexts/ThemeContext";

const NEW_GAME_ALERT = ({ action1, action2, visible }) => {
  const { theme, animation } = useContext(ThemeContext);

  const animationType = animation
    ? theme.name === "default"
      ? "fade"
      : "slide"
    : "none";

  return (
    <Modal
      animationType={animationType}
      transparent={true}
      presentationStyle={"pageSheet"}
      visible={visible}
    >
      <ModalContainerAlert theme={theme}>
        <Header2>You have an unfinished match</Header2>
        <Header3>
          If you start a new match, you are going to lose your previous
          unfinished match.
        </Header3>
        <Header4>Proceed?</Header4>
        <BottomButtons theme={theme}>
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
      </ModalContainerAlert>
    </Modal>
  );
};

export default NEW_GAME_ALERT;
