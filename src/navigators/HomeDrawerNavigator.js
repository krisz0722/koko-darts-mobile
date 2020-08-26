import React, { useState, useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button, View, Text } from "react-native";
import { GameContext } from "../contexts/GameContext";
import { Authcontext } from "../contexts/AuthContext";
import HOME_DRAWER_CONTENT from "./HomeDrawerContent";
import HomeNavigator from "./HomeNavigator";
import { ThemeContext } from "../contexts/ThemeContext";
import ACTIVITY_INDICATOR from "../components/modals/Activityindicator";
import logOut from "../_backend/auth/authLogOut";
import deleteAccount from "../_backend/auth/authDelete";

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

const HomeDrawerNavigator = ({ navigation }) => {
  const {
    gameData: { activePlayer },
  } = useContext(GameContext);
  const {
    userData: { username },
  } = useContext(Authcontext);

  const { theme } = useContext(ThemeContext);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingLogOut, setLoadingLogOut] = useState(false);

  const drawerstyle = {
    width: "auto",
    backgroundColor: "transparent",
  };

  const handleLogOut = async () => {
    setLoadingLogOut(true);
    await logOut(navigation);
    setLoadingLogOut(false);
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    await deleteAccount(username, navigation);
    setLoadingDelete(false);
  };

  return (
    <>
      {loadingDelete || loadingLogOut ? (
        <ACTIVITY_INDICATOR
          text={
            loadingDelete
              ? "DELETING PROFILE..."
              : loadingLogOut
              ? "LOGGING OUT..."
              : "he???"
          }
          theme={theme}
        />
      ) : (
        <Navigator
          backBehavior={"initialRoute"}
          screenOptions={{ swipeEnabled: false }}
          drawerContent={(props) => (
            <HOME_DRAWER_CONTENT
              logOut={handleLogOut}
              deleteAccount={handleDelete}
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
        </Navigator>
      )}
    </>
  );
};

export default HomeDrawerNavigator;
