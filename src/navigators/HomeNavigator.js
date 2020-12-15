import React, {
  useRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import HOME from "../screens/home/Home";
import SETTINGS from "../screens/settings/home/Settings";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PROFILE from "../screens/profile/Profile";
import PREGAME_SETTINGS from "../screens/settings/pregame/PreGameSettings";
import STATS from "../screens/stats/Stats";
// import usersCollection from "../server/functions/controller/declineFriendRequest";
import { Authcontext } from "../contexts/AuthContext";
import BOTTOM_TABBAR_CONTENT from "./HomeNavigatorContent";
import PLAYER_IS_IN_GAME from "../screens/info/InGame";
import { AppState } from "react-native";
import updateAuthMatchesSave from "../contexts/actions/authContext/UpdateMatchesSave";
import { useRoute } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import navigatingIn from "../utils/navigatingIn";

const HOMENAVIGATOR = ({ navigation }) => {
  const { Screen, Navigator } = createMaterialTopTabNavigator();
  const {
    dispatchUserData,
    userData: { username, id },
  } = useContext(Authcontext);

  const route = useRoute().state;
  const index = route ? route.index : null;
  const appState = useRef(AppState.currentState);

  const [gameData, setGameData] = useState(null);

  const isFocused = useIsFocused();

  // useEffect(() => {
  //   const unsubscribe = usersCollection
  //     .where("username", "==", username)
  //     .onSnapshot((snapshot) => {
  //       const profile =
  //         snapshot.docs.length > 0
  //           ? snapshot.docs
  //               .find((item) => item.data().username === username)
  //               .data()
  //           : null;
  //       if (profile) {
  //         const { inGameKey, inGame, matches, unfinishedMatches } = profile;
  //
  //         const gameData =
  //           unfinishedMatches.find((item) => item.key === inGameKey) ||
  //           matches.find((item) => item.key === inGameKey);
  //
  //         const initializedBy = gameData ? gameData.initializedBy : null;
  //
  //         dispatchUserData({ type: "UPDATE_PROFILE", value: profile });
  //         setGameData(gameData);
  //         const navigate = inGame && initializedBy !== username;
  //         if (navigate) {
  //           navigation.navigate("ingame");
  //         }
  //       }
  //     });
  //
  //   return () => {
  //     unsubscribe();
  //   };
  // }, [navigation, dispatchUserData, username]);

  const _handleAppStateChange = useCallback(
    async (nextAppState) => {
      appState.current = nextAppState;
      if (
        appState.current === "background" ||
        (appState.current === "inactive" &&
          gameData.initializedBy === username &&
          gameData.p1_DATA.score !== 0 &&
          gameData.p2_DATA.score !== 0)
      ) {
        navigatingIn(navigation, "leave");
        await updateAuthMatchesSave(gameData, id, username, false);
        navigatingIn(navigation, "leave", gameData);
      }
    },
    [navigation, id, gameData, username],
  );

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, [_handleAppStateChange]);

  return (
    <>
      {!isFocused ? null : (
        <Navigator
          timingConfig={{ duration: 0.1 }}
          tabBarPosition={"bottom"}
          tabBar={(props) => <BOTTOM_TABBAR_CONTENT index={index} {...props} />}
          swipeEnabled={false}
        >
          <Screen name="home" component={HOME} />
          <Screen name="settings" component={SETTINGS} />
          <Screen name="profile" component={PROFILE} />
          <Screen name="stats_saved" component={STATS} />
          <Screen name="pregame" component={PREGAME_SETTINGS} />
          <Screen name="ingame" component={PLAYER_IS_IN_GAME} />
        </Navigator>
      )}
    </>
  );
};

export default HOMENAVIGATOR;
