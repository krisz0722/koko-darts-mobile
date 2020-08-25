import React from "react";
import styled from "styled-components";
import { Text, Modal, SafeAreaView, ActivityIndicator } from "react-native";
import { BasicTextBold, FlexCol } from "../../styles/css_mixins";
import { ModalContainerLoading } from "./StyledModal";

export const Safe = styled(SafeAreaView)`
  height: 100%;
  width: 100%;
  ${FlexCol};
  background-color: ${({ theme, filled }) =>
    filled ? theme.bgOverlay2 : "transparent"};
`;

export const Loading = styled(Text)`
  color: ${({ theme, filled }) => (filled ? theme.text : theme.text)};
  font-size: 24;
  ${BasicTextBold};
`;

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
