import React from "react";
import { Modal } from "react-native";
import { Header2, ModalContainerAlert } from "./StyledModal";
import THEMED_BUTTON from "../buttons/ThemedButton";
import { BottomButtons } from "./StyledModal";

const DELETE_ALERT = React.memo(
  ({ animation, theme, action1, action2, visible }) => {
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
          <Header2>Are you sure you want to delete your account?</Header2>
          <BottomButtons theme={theme}>
            <THEMED_BUTTON
              text={"cancel"}
              length={2}
              size={"small"}
              type={"danger"}
              action={() => action1()}
              inGameTheme={theme}
            />
            <THEMED_BUTTON
              size={"small"}
              text={"yes"}
              type={"success"}
              length={2}
              action={() => action2()}
              inGameTheme={theme}
            />
          </BottomButtons>
        </ModalContainerAlert>
      </Modal>
    );
  },
);

export default DELETE_ALERT;
