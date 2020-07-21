import React, { useContext } from "react";
import { Modal } from "react-native";
import { Header2, Header3, ModalContainerAlert } from "./StyledModal";
import THEMED_BUTTON from "../buttons/ThemedButton";
import { BottomButtons } from "./StyledModal";
import { ThemeContext } from "../../contexts/ThemeContext";

const EXIT_APP_ALERT = ({ action1, action2, visible }) => {
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
        <Header2>EXIT APP</Header2>
        <Header3>Are you sure you want to exit the application?</Header3>
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

export default EXIT_APP_ALERT;
