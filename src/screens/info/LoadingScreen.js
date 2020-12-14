import React, { useState, useCallback, useEffect, useContext } from "react";
import { Modal, ActivityIndicator } from "react-native";
import { ModalContainerLoading } from "../../components/modals/StyledModal";
import { useRoute } from "@react-navigation/native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AppBackground } from "../../../App";
import { ScreenContainer } from "../../navigators/StyledNav";
import { useIsFocused } from "@react-navigation/native";
import { Loading, Safe } from "./StyledLoadingScreen";
import { GameContext } from "../../contexts/GameContext";
import { SettingsContext } from "../../contexts/SettingsContext";
import { Authcontext } from "../../contexts/AuthContext";
import auth from "@react-native-firebase/auth";
import loadAppData from "../../utils/auth/authLoadAppData";

const LOADING_SCREEN = React.memo(({ navigation, filled }) => {
  const {
    theme,
    dispatchTheme,
    themeContext: { background },
  } = useContext(ThemeContext);
  const { dispatchGameData } = useContext(GameContext);
  const { dispatchSettings } = useContext(SettingsContext);
  const { dispatchUserData } = useContext(Authcontext);

  const [visible, setVisible] = useState(false);

  const params = useRoute().params;

  const reducers = useCallback(
    () => ({
      theme: dispatchTheme,
      game: dispatchGameData,
      settings: dispatchSettings,
      user: dispatchUserData,
    }),
    [dispatchGameData, dispatchSettings, dispatchTheme, dispatchUserData],
  );

  useEffect(() => {
    if (params.load) {
      (async () => {
        await loadAppData(params.userData, navigation, reducers);
      })();
    }
  }, [params.userData, reducers, navigation, params.load]);

  const text = params ? params.text : "NEMJO";

  auth().onAuthStateChanged(async (user) => {
    if (user) {
    } else {
    }
  });

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
