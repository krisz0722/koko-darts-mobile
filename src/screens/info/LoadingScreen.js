import React, { useContext } from "react";
import styled from "styled-components";
import { Text, Modal, SafeAreaView, ActivityIndicator } from "react-native";
import { BasicTextBold, FlexCol } from "../../styles/css_mixins";
import { ModalContainerLoading } from "../../components/modals/StyledModal";
import { useRoute } from "@react-navigation/native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AppBackground } from "../../../App";
import { ScreenContainer } from "../../navigators/AppNavigator";

export const Safe = styled(SafeAreaView)`
  height: 100%;
  width: 100%;
  ${FlexCol};
  background-color: ${({ theme, filled }) =>
    filled ? theme.bgOverlay2 : "transparent"};
`;

export const Loading = styled(Text)`
  color: ${({ theme, filled }) => (filled ? theme.text : theme.text)};
  font-size: ${({ theme }) => theme.info.loading};
  ${BasicTextBold};
`;

const LOADING_SCREEN = React.memo(({ filled, visible }) => {
  const {
    theme,
    themeContext: { background },
  } = useContext(ThemeContext);
  const params = useRoute().params;
  console.log("ROUTE", useRoute());
  const text = params ? params.text : "NEMJO";
  console.log("TEXT", text);
  console.log("VISIBLE", visible);
  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      presentationStyle={"pageSheet"}
      visible={visible}
    >
      <>
        {background ? (
          <AppBackground
            source={require("../../../assets/bg.png")}
            resizeMode="cover"
          />
        ) : null}

        <ScreenContainer theme={theme}>
          <Safe filled={filled} theme={theme}>
            <ModalContainerLoading filled={filled}>
              <ActivityIndicator size={"large"} color={theme.text} />
              <Loading filled={filled} theme={theme}>
                {text}
              </Loading>
            </ModalContainerLoading>
          </Safe>
        </ScreenContainer>
      </>
    </Modal>
  );
});

export default LOADING_SCREEN;
