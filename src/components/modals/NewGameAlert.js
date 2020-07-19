import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import { Modal } from "react-native";
import THEMED_BUTTON from "../buttons/ThemedButton";
import { BottomButtons } from "./StyledModal";
import { Header2, Header3, Header4, ModalContainer2 } from "./StyledModal";

const NEW_GAME_ALERT = ({ action1, action2, visible }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  return (
    <Modal
      animationType={selectedTheme.name === "default" ? "fade" : "slide"}
      transparent={true}
      presentationStyle={"pageSheet"}
      visible={visible}
    >
      <ModalContainer2 theme={selectedTheme}>
        <Header2>You have an unfinished match</Header2>
        <Header3>
          If you start a new match, you are going to lose your previous
          unfinished match.
        </Header3>
        <Header4>Proceed?</Header4>
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
      </ModalContainer2>
    </Modal>
  );
};

export default NEW_GAME_ALERT;
