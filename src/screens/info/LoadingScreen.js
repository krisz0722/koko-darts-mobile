import React, { useState, useEffect, useContext } from "react";
import { Modal, ActivityIndicator } from "react-native";
import { ModalContainerLoading } from "../../components/modals/StyledModal";
import { useRoute } from "@react-navigation/native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AppBackground } from "../../../App";
import { ScreenContainer } from "../../navigators/StyledNav";
import { useIsFocused } from "@react-navigation/native";
import { Loading, Safe } from "./StyledLoadingScreen";

const LOADING_SCREEN = React.memo(({ filled }) => {
  const {
    theme,
    themeContext: { background },
  } = useContext(ThemeContext);
  const params = useRoute().params;
  const text = params ? params.text : "NEMJO";

  const [visible, setVisible] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [isFocused]);

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
