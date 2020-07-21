import React, { useContext } from "react";
import { Modal } from "react-native";
import THEMED_BUTTON from "../buttons/ThemedButton";
import { BottomButtons } from "./StyledModal";
import { Header2, Header3, Header4, ModalContainerAlert } from "./StyledModal";
import { ThemeContext } from "../../contexts/ThemeContext";

const LEAVE_MATCH_ALERT = ({ action1, action2, visible }) => {
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
        <Header2>leaving match</Header2>
        <Header3>
          Are you sure you want to leave the match? (It will be saved, you can
          continue it later.)
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

export default LEAVE_MATCH_ALERT;

//TODO replace this with activityi indicator aligned to async post (save game)
