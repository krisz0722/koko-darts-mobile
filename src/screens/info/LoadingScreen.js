import React, { useState, useEffect, useContext } from "react";
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
import loadAppData from "../../_auth/authLoadAppData";

const LOADING_SCREEN = React.memo(({ navigation, filled }) => {
  const {
    theme,
    dispatchTheme,
    themeContext: { background },
  } = useContext(ThemeContext);
  const { dispatchGameData } = useContext(GameContext);
  const { dispatchSettings } = useContext(SettingsContext);
  const { dispatchUserData } = useContext(Authcontext);

  const reducers = {
    theme: dispatchTheme,
    game: dispatchGameData,
    settings: dispatchSettings,
    user: dispatchUserData,
  };

  const [visible, setVisible] = useState(false);

  const params = useRoute().params;
  console.log("PARAMS", params);

  useEffect(() => {
    if (params.load) {
      (async () => {
        const user = auth().currentUser;
        console.log("USUUUUSER", user);
        await loadAppData(user.uid, navigation, reducers);
      })();
    }
  }, [navigation, params.load, reducers]);

  const text = params ? params.text : "NEMJO";

  // auth().onAuthStateChanged(async (user) => {
  //   if (user) {
  //     console.log("UUUUUSEEEER", user);
  //   } else {
  //     console.log("logged out!!!!");
  //   }
  // });

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
