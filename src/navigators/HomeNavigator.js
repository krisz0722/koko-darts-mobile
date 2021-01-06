import React, {
  useRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import firestore from "@react-native-firebase/firestore";
import HOME from "../screens/home/Home";
import SETTINGS from "../screens/settings/home/Settings";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PROFILE from "../screens/profile/Profile";
import PREGAME_SETTINGS from "../screens/settings/pregame/PreGameSettings";
import STATS from "../screens/stats/Stats";
import updateAuthMatchesSave from "../contexts/actions/authContext/UpdateMatchesSave";
import { Authcontext } from "../contexts/AuthContext";
import BOTTOM_TABBAR_CONTENT from "./HomeNavigatorContent";
import PLAYER_IS_IN_GAME from "../screens/info/InGame";
import { AppState } from "react-native";
import { CommonActions, useRoute } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

const HOMENAVIGATOR = React.memo(({ navigation }) => {
  const { Screen, Navigator } = createMaterialTopTabNavigator();
  const {
    dispatchUserData,
    userData: { id },
  } = useContext(Authcontext);

  const route = useRoute().state;
  const index = route ? route.index : null;
  const appState = useRef(AppState.currentState);

  const [gameData, setGameData] = useState(null);
  const [navigate, setNavigate] = useState(null);
  const [initialized, setInitialized] = useState(null);

  const isFocused = useIsFocused();

  const dbListener = useCallback(() => {
    const usersCollection = firestore().collection("users");
    usersCollection.doc(id).onSnapshot((doc) => {
      const data = doc.data();

      const { inGameKey, inGame, matches, unfinishedMatches } = data;

      const gameData =
        unfinishedMatches.find((item) => item.key === inGameKey) ||
        matches.find((item) => item.key === inGameKey);
      setGameData(gameData);
      const initializedBy = gameData ? gameData.initializedBy : null;
      setInitialized(initializedBy);
      const navigate = inGame && initializedBy !== id;
      setNavigate(navigate);
      dispatchUserData({ type: "UPDATE_PROFILE", value: data });
    });
  }, [dispatchUserData, id]);

  useEffect(() => {
    if (navigate) {
      navigation.navigate("ingame");
    }

    if (!navigate && !isFocused && initialized && initialized !== id) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "homedrawernavigator" }],
        }),
      );
    }
  }, [navigate, initialized, id, isFocused, navigation]);

  useEffect(() => {
    dbListener();
  }, [dbListener]);

  const _handleAppStateChange = useCallback(
    async (nextAppState) => {
      appState.current = nextAppState;
      if (
        appState.current === "background" ||
        (appState.current === "inactive" &&
          gameData.initializedBy === id &&
          gameData.p1_DATA.score !== 0 &&
          gameData.p2_DATA.score !== 0)
      ) {
        const updatedUserData = await updateAuthMatchesSave(
          gameData,
          id,
          gameData.inGame,
          false,
        );
        dispatchUserData({ type: "UPDATE_PROFILE", value: updatedUserData });
      }
    },
    [dispatchUserData, id, gameData],
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
});

export default HOMENAVIGATOR;
