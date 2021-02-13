import React from "react";
import { Modal, ActivityIndicator } from "react-native";
import { ModalContainerLoading } from "./StyledModal";
import { Safe, Loading } from "./StyledActivityindicator";

const ACTIVITY_INDICATOR = React.memo(({ filled, visible, theme, text }) => {
  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      presentationStyle={"pageSheet"}
      visible={visible}
    >
      <Safe filled={filled} theme={theme}>
        <ModalContainerLoading filled={filled}>
          <ActivityIndicator size={"large"} color={theme.text} />
          <Loading filled={filled} theme={theme}>
            {text}
          </Loading>
        </ModalContainerLoading>
      </Safe>
    </Modal>
  );
});

export default ACTIVITY_INDICATOR;
