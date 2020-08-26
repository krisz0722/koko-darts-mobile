import React, { useRef, useMemo, useState, useEffect, useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import GAME_CLASSIC from "../screens/gamewindow/Classic";
import { AppState } from "react-native";
import DRAWER_CONTENT from "./DrawerContent";
import { GameContext } from "../contexts/GameContext";
import SETTINGS_INGAME from "../screens/settings-ingame/SettingsInGame";
import { CommonActions, useRoute } from "@react-navigation/native";
import STATS from "../screens/stats/Stats";
import { Authcontext } from "../contexts/AuthContext";
import { usersCollection } from "../_backend/db/crudOther";
import updateAuthMatchesSave from "../contexts/actions/authContext/UpdateMatchesSave";
import ACTIVITY_INDICATOR from "../components/modals/Activityindicator";
import STATS2 from "../screens/stats/Stats2";
import FINISH_LEG_MODAL from "../components/modals/FinishLeg";
import FINISH_MATCH_MODAL from "../components/modals/FinishMatch";
import REMATCH_MODAL from "../components/modals/Rematch";

const { Navigator, Screen } = createDrawerNavigator();

const DrawerNavigator = ({ navigation }) => {
  const {
    gameData,
    dispatchGameData,
    gameData: {
      settings: { theme, animation },
      activePlayer,
      inactivePlayer,
      initializedBy,
    },
  } = useContext(GameContext);
  const {
    dispatchUserData,
    userData,
    userData: { username },
  } = useContext(Authcontext);

  const params = useRoute().params;
  const { flag } = params;
  const flag2 = useMemo(() => flag, [flag]);

  const [loading, setLoading] = useState(flag === "continue" || flag === "new");
  const [inGame, setInGame] = useState(false);

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    (async () => {
      if (flag2 === "new" || flag2 === "continue") {
        setLoading(true);
      }

      if (flag2 === "continue") {
        await dispatchGameData({
          type: "CONTINUE_MATCH",
          value: params.gameData,
        });
      }
    })();
  }, [dispatchGameData, params.gameData, flag2]);

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

  useEffect(() => {
    const _handleAppStateChange = async (nextAppState) => {
      appState.current = nextAppState;
      if (
        appState.current === "background" &&
        gameData.initializedBy === username
      ) {
        await updateAuthMatchesSave(gameData, username, false);
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: "homedrawernavigator" }],
          }),
        );
        dispatchGameData({ type: "LOAD_SETTINGS" });
      }
    };

    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, [gameData]);

  const drawerstyle = {
    width: "40%",
    backgroundColor: "transparent",
  };

  const handleLeaveMatch = async () => {
    try {
      await updateAuthMatchesSave(gameData, username, false);
    } catch (err) {
      console.log(err);
      alert("ERROR WHILE SAVING MATCH: ", err);
    }

    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "homedrawernavigator" }],
      }),
    );
  };

  return (
    <>
      <ACTIVITY_INDICATOR
        visible={loading}
        animation={animation}
        text={flag === "new" ? "GAME ON!" : "Loading last match..."}
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
              <DRAWER_CONTENT
                theme={theme}
                handleLeaveMatch={handleLeaveMatch}
                gameData={gameData}
                inactivePlayer={inactivePlayer}
                {...props}
              />
            )}
            drawerStyle={drawerstyle}
            drawerPosition={"right"}
            overlayColor={theme.game[activePlayer + "Overlay"]}
          >
            <Screen name="game" component={GAME_CLASSIC} />
            <Screen name="settings-ingame" component={SETTINGS_INGAME} />
            <Screen name="stats" component={STATS} />
            <Screen name="legover" component={FINISH_LEG_MODAL} />
            <Screen name={"matchover"} component={FINISH_MATCH_MODAL} />
            <Screen name={"rematch"} component={REMATCH_MODAL} />
          </Navigator>
        )}
      </>
    </>
  );
};

export default DrawerNavigator;
