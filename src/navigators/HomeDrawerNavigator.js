import React, { useState, useEffect, useCallback, useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button, View, Text, BackHandler } from "react-native";
import { GameContext } from "../contexts/GameContext";
import { Authcontext } from "../contexts/AuthContext";
import HOME_DRAWER_CONTENT from "./HomeDrawerContent";
import HOMENAVIGATOR from "./HomeNavigator";
import { ThemeContext } from "../contexts/ThemeContext";
import logOut from "../_auth/authLogOut";
import deleteAccount from "../_auth/authDelete";
import DELETE_ALERT from "../components/modals/DeleteAlert";
import LOADING_SCREEN from "../screens/info/LoadingScreen";
import CONTACT from "../screens/contact/Contact";
import { SettingsContext } from "../contexts/SettingsContext";
import EXIT_APP_ALERT from "../components/modals/ExitAppAlert";

const ABOUT = ({ navigation }) => (
  <View>
    <Text>about</Text>
    <Button title="back" onPress={() => navigation.goBack()} />
  </View>
);
const { Navigator, Screen } = createDrawerNavigator();

const HOME_DRAWER_NAVIGATOR = React.memo(({ navigation }) => {
  const {
    dispatchGameData,
    gameData: { activePlayer },
  } = useContext(GameContext);
  const {
    dispatchUserData,
    userData: { username },
  } = useContext(Authcontext);
  const {
    theme,
    themeContext: { animation },
  } = useContext(ThemeContext);
  const { dispatchSettings } = useContext(SettingsContext);

  const [deleteModal, setDeleteModal] = useState(false);
  const [exitModal, setExitModal] = useState(false);

  const drawerstyle = {
    width: "auto",
    backgroundColor: "transparent",
  };

  const handleLogOut = useCallback(async () => {
    await logOut(navigation);
  }, [navigation]);

  const handleExitApp = () => {
    BackHandler.exitApp();
    setExitModal(!exitModal);
  };

  const backAction = () => {
    setExitModal(true);
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction,
  );

  const handleDelete = useCallback(async () => {
    await deleteAccount(username, navigation);
    dispatchSettings({ type: "RESET" });
    dispatchGameData({ type: "RESET" });
    dispatchUserData({ type: "DELETING_PROFILE" });
  }, [
    dispatchSettings,
    dispatchUserData,
    dispatchGameData,
    username,
    navigation,
  ]);

  const cancelDelete = useCallback(() => {
    navigation.navigate("home");
    setDeleteModal(false);
  }, [navigation]);

  useEffect(() => {
    return () => backHandler.remove();
  }, [backHandler]);

  return (
    <>
      {deleteModal ? (
        <DELETE_ALERT
          animation={animation}
          theme={theme}
          action1={cancelDelete}
          action2={handleDelete}
          visible={deleteModal}
        />
      ) : null}
      {exitModal ? (
        <EXIT_APP_ALERT
          animation={animation}
          theme={theme}
          action1={() => setExitModal(!exitModal)}
          action2={handleExitApp}
          visible={exitModal}
        />
      ) : null}

      <>
        <Navigator
          backBehavior={"initialRoute"}
          screenOptions={{ swipeEnabled: false }}
          drawerContent={(props) => (
            <HOME_DRAWER_CONTENT
              logOut={handleLogOut}
              deleteAccount={() => setDeleteModal(true)}
              theme={theme}
              username={username}
              {...props}
            />
          )}
          drawerStyle={drawerstyle}
          drawerPosition={"right"}
          overlayColor={theme.game[activePlayer + "Overlay"]}
        >
          <Screen name={"homenavigator"} component={HOMENAVIGATOR} />
          <Screen name="about" component={ABOUT} />
          <Screen name="contact" component={CONTACT} />
          <Screen name="loadingscreen" component={LOADING_SCREEN} />
          <Screen name="reportbug" component={CONTACT} />
        </Navigator>
      </>
    </>
  );
});

export default HOME_DRAWER_NAVIGATOR;
