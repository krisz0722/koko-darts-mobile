import React, { useRef, useMemo, useState, useEffect, useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import GAME_CLASSIC from "../screens/gamewindow/Classic";
import { AppState } from "react-native";
import DRAWER_CONTENT from "./DrawerContent";
import { GameContext } from "../contexts/GameContext";
import SETTINGS_INGAME from "../screens/settings/ingame/SettingsInGame";
import { useRoute } from "@react-navigation/native";
import STATS from "../screens/stats/Stats";
import { Authcontext } from "../contexts/AuthContext";
import { usersCollection } from "../_backend/db/crudOther";
import updateAuthMatchesSave from "../contexts/actions/authContext/UpdateMatchesSave";
import PLAYER_IS_IN_GAME from "../screens/info/InGame";
import FINISH_LEG from "../screens/endgame/FinishLeg";
import FINISH_MATCH from "../screens/endgame/FinishMatch";
import REMATCH_MODAL from "../screens/endgame/Rematch";
import LOADING_SCREEN from "../screens/info/LoadingScreen";

const { Navigator, Screen } = createDrawerNavigator();

const DrawerNavigator = ({ navigation }) => {
  const {
    gameData,
    dispatchGameData,
    gameData: {
      settings: { theme },
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
        appState.current === "background" ||
        (appState.current === "incative" && gameData.initializedBy === username)
      ) {
        await updateAuthMatchesSave(
          gameData,
          username,
          false,
          navigation,
          "leave",
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
      await updateAuthMatchesSave(
        gameData,
        username,
        false,
        navigation,
        "leave",
      );
    } catch (err) {
      console.log(err);
      alert("ERROR WHILE SAVING MATCH: ", err);
    }
  };

  return (
    <>
      {inGame ? (
        <>
          {gameData ? (
            <PLAYER_IS_IN_GAME
              username={username}
              gameData={gameData}
              theme={theme}
            />
          ) : (
            <PLAYER_IS_IN_GAME
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
          <Screen name="legover" component={FINISH_LEG} />
          <Screen name={"matchover"} component={FINISH_MATCH} />
          <Screen name={"rematch"} component={REMATCH_MODAL} />
          <Screen name={"loadingscreen"} component={LOADING_SCREEN} />
        </Navigator>
      )}
    </>
  );
};

export default DrawerNavigator;
