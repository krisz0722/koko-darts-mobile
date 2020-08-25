import React, { useState, useEffect, useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button, View, Text } from "react-native";
import { GameContext } from "../contexts/GameContext";
import { Authcontext } from "../contexts/AuthContext";
import { usersCollection } from "../fb/crud";
import ACTIVITY_INDICATOR from "../components/modals/Activityindicator";
import STATS2 from "../screens/stats/Stats2";
import HOME_DRAWER_CONTENT from "./HomeDrawerContent";
import HomeNavigator from "./HomeNavigator";
import { ThemeContext } from "../contexts/ThemeContext";

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

const HomeDrawerNavigator = () => {
  const {
    gameData,
    gameData: { activePlayer, initializedBy },
  } = useContext(GameContext);
  const {
    dispatchUserData,
    userData,
    userData: { username },
  } = useContext(Authcontext);

  const { theme, animation } = useContext(ThemeContext);

  const [loading, setLoading] = useState(true);
  const [inGame, setInGame] = useState(false);

  useEffect(() => {
    const unsubscribe = usersCollection
      .where("username", "==", username)
      .onSnapshot((snapshot) => {
        const profile = snapshot.docs
          .find((item) => item.data().username === username)
          .data();
        setLoading(false);
        setInGame(profile.inGame && initializedBy !== username);
      });

    return () => {
      unsubscribe();
    };
  }, [initializedBy, dispatchUserData, username]);

  const drawerstyle = {
    width: "auto",
    backgroundColor: "transparent",
  };

  return (
    <>
      <ACTIVITY_INDICATOR
        visible={loading}
        animation={animation}
        text={"loading profile..."}
        theme={theme}
        filled={true}
      />
      <>
        {inGame ? (
          <>
            {gameData ? (
              <STATS2 username={username} gameData={gameData} theme={theme} />
            ) : (
              <STATS2
                username={username}
                lastMatch={true}
                gameData={userData.matches[0]}
                theme={theme}
              />
            )}
          </>
        ) : (
          <Navigator
            backBehavior={"initialRoute"}
            screenOptions={{ swipeEnabled: false }}
            drawerContent={(props) => (
              <HOME_DRAWER_CONTENT
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
    </>
  );
};

export default HomeDrawerNavigator;
