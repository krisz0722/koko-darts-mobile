import React, { useState, useCallback, useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button, View, Text } from "react-native";
import { GameContext } from "../contexts/GameContext";
import { Authcontext } from "../contexts/AuthContext";
import HOME_DRAWER_CONTENT from "./HomeDrawerContent";
import HOMENAVIGATOR from "./HomeNavigator";
import { ThemeContext } from "../contexts/ThemeContext";
import logOut from "../_backend/auth/authLogOut";
import deleteAccount from "../_backend/auth/authDelete";
import DELETE_ALERT from "../components/modals/DeleteAlert";
import LOADING_SCREEN from "../screens/info/LoadingScreen";
import CONTACT from "../screens/contact/Contact";

const ABOUT = ({ navigation }) => (
  <View>
    <Text>about</Text>
    <Button title="back" onPress={() => navigation.goBack()} />
  </View>
);
const { Navigator, Screen } = createDrawerNavigator();

const HOME_DRAWER_NAVIGATOR = React.memo(({ navigation }) => {
  const {
    gameData: { activePlayer },
  } = useContext(GameContext);
  const {
    userData: { username },
  } = useContext(Authcontext);
  const {
    theme,
    themeContext: { animation },
  } = useContext(ThemeContext);

  const [deleteModal, setDeleteModal] = useState(false);

  const drawerstyle = {
    width: "auto",
    backgroundColor: "transparent",
  };

  const handleLogOut = useCallback(async () => {
    await logOut(navigation);
  }, [navigation]);

  const handleDelete = useCallback(async () => {
    await deleteAccount(username, navigation);
  }, [username, navigation]);

  const cancelDelete = useCallback(() => {
    navigation.navigate("home");
    setDeleteModal(false);
  }, [navigation]);

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
