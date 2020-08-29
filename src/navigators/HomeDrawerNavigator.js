import React, { useState, useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button, View, Text } from "react-native";
import { GameContext } from "../contexts/GameContext";
import { Authcontext } from "../contexts/AuthContext";
import HOME_DRAWER_CONTENT from "./HomeDrawerContent";
import HomeNavigator from "./HomeNavigator";
import { ThemeContext } from "../contexts/ThemeContext";
import logOut from "../_backend/auth/authLogOut";
import deleteAccount from "../_backend/auth/authDelete";
import DELETE_ALERT from "../components/modals/DeleteAlert";
import LOADING_SCREEN from "../screens/info/LoadingScreen";

const ABOUT = ({ navigation }) => (
  <View>
    <Text>about</Text>
    <Button title="back" onPress={() => navigation.goBack()} />
  </View>
);

const REPORT_BUG = ({ navigation }) => (
  <View>
    <Text>report bug</Text>
    <Button title="back" onPress={() => navigation.goBack()} />
  </View>
);

const CONTACT = ({ navigation }) => (
  <View>
    <Text>contact</Text>
    <Button title="back" onPress={() => navigation.goBack()} />
  </View>
);

const { Navigator, Screen } = createDrawerNavigator();

const HomeDrawerNavigator = React.memo(({ navigation }) => {
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

  const handleLogOut = async () => {
    await logOut(navigation);
  };

  const handleDelete = async () => {
    await deleteAccount(username, navigation);
  };

  const cancelDelete = () => {
    navigation.navigate("home");
    setDeleteModal(false);
  };

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
          <Screen name={"homenavigator"} component={HomeNavigator} />
          <Screen name="about" component={ABOUT} />
          <Screen name="report" component={REPORT_BUG} />
          <Screen name="contact" component={CONTACT} />
          <Screen name="loadingscreen" component={LOADING_SCREEN} />
        </Navigator>
      </>
    </>
  );
});

export default HomeDrawerNavigator;
