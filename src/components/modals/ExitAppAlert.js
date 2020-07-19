import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import { Modal } from "react-native";
import { Header2, Header3, ModalContainer2 } from "./StyledModal";
import THEMED_BUTTON from "../buttons/ThemedButton";
import { BottomButtons } from "../../screens/settings/StyledSettings";

const EXIT_APP_ALERT = ({ action1, action2, visible }) => {
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
        <Header2>EXIT APP</Header2>
        <Header3>Are you sure you want to exit the application?</Header3>
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

export default EXIT_APP_ALERT;
