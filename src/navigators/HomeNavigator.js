import React, { useRef, useContext, useEffect, useState } from "react";
import HOME from "../screens/home/Home";
import SETTINGS from "../screens/settings/Settings";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PROFILE from "../screens/profile/Profile";
import PREGAME_SETTINGS from "../screens/pregame/PreGameSettings";
import { ThemeContext } from "../contexts/ThemeContext";
import STATS from "../screens/stats/Stats";
import { usersCollection } from "../fb/crud";
import { Authcontext } from "../contexts/AuthContext";
import ACTIVITY_INDICATOR from "../components/modals/Activityindicator";
import BOTTOM_TABBAR_CONTENT from "./HomeNavigatorContent";
import STATS2 from "../screens/stats/Stats2";
import { AppState } from "react-native";
import updateAuthMatchesSave from "../contexts/actions/authContext/UpdateMatchesSave";
import { CommonActions, useRoute } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

const HomeNavigator = ({ navigation }) => {
  const { Screen, Navigator } = createMaterialTopTabNavigator();
  const {
    dispatchUserData,
    userData,
    userData: { username },
  } = useContext(Authcontext);

  const route = useRoute().state;
  const index = route ? route.index : null;
  console.log(route);
  const appState = useRef(AppState.currentState);

  const { theme, animation } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [inGame, setInGame] = useState(false);
  const [gameData, setGameData] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    const unsubscribe = usersCollection
      .where("username", "==", username)
      .onSnapshot((snapshot) => {
        const profile =
          snapshot.docs.length > 0
            ? snapshot.docs
                .find((item) => item.data().username === username)
                .data()
            : null;
        console.log("PROFILE", profile);
        if (profile) {
          const { inGameKey, inGame, unfinishedMatches } = profile;

          const gameData = unfinishedMatches.find(
            (item) => item.key === inGameKey,
          );
          const initializedBy = gameData ? gameData.initializedBy : null;

          dispatchUserData({ type: "UPDATE_PROFILE", value: profile });
          setGameData(gameData);
          setLoading(false);
          setInGame(inGame && initializedBy !== username);
        }
      });

    return () => {
      unsubscribe();
      setLoading(false);
    };
  }, [dispatchUserData, username]);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = async (nextAppState) => {
    appState.current = nextAppState;
    console.log("STATECHANGE GAMEDATA", gameData);
    if (
      appState.current === "background" &&
      gameData.initializedBy === username &&
      gameData.p1_DATA.score !== 0 &&
      gameData.p2_DATA.score !== 0
    ) {
      // updateAuthMatchesSave(gameData, username, true);
      console.log("IF");

      updateAuthMatchesSave(gameData, username, false);
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "homenavigator" }],
        }),
      );
    }
    console.log(nextAppState);
  };

  return (
    <>
      {loading && isFocused ? (
        <ACTIVITY_INDICATOR
          visible={loading}
          animation={animation}
          text={loading ? "Loading profile..." : ""}
          theme={theme}
          filled={false}
        />
      ) : inGame ? (
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
      ) : !isFocused ? null : (
        <Navigator
          timingConfig={{ duration: 1 }}
          tabBarPosition={"bottom"}
          tabBar={(props) => <BOTTOM_TABBAR_CONTENT index={index} {...props} />}
        >
          <Screen name="home" component={HOME} />
          <Screen name="settings" component={SETTINGS} />
          <Screen name="profile" component={PROFILE} />
          <Screen name="stats_saved" component={STATS} />
          <Screen name="pregame" component={PREGAME_SETTINGS} />
        </Navigator>
      )}
    </>
  );
};

export default HomeNavigator;
