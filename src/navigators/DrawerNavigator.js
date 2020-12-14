import React, {
  useRef,
  useCallback,
  useMemo,
  useEffect,
  useContext,
} from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import GAME_CLASSIC from "../screens/gamewindow/Classic";
import { AppState } from "react-native";
import DRAWER_CONTENT from "./DrawerContent";
import { GameContext } from "../contexts/GameContext";
import SETTINGS_INGAME from "../screens/settings/ingame/SettingsInGame";
import { useRoute } from "@react-navigation/native";
import { Authcontext } from "../contexts/AuthContext";
import updateAuthMatchesSave from "../contexts/actions/authContext/UpdateMatchesSave";
import FINISH_LEG from "../screens/endgame/FinishLeg";
import FINISH_MATCH from "../screens/endgame/FinishMatch";
import REMATCH_MODAL from "../screens/endgame/Rematch";
import LOADING_SCREEN from "../screens/info/LoadingScreen";
import STATS_INMATCH from "../screens/stats/StatsInMatch";

const { Navigator, Screen } = createDrawerNavigator();

const DRAWER_NAVIGATOR = ({ navigation }) => {
  const {
    gameData,
    dispatchGameData,
    gameData: {
      settings: { theme },
      activePlayer,
      inactivePlayer,
    },
  } = useContext(GameContext);
  const {
    userData: { username },
  } = useContext(Authcontext);

  const params = useRoute().params;
  const { flag } = params;
  const flag2 = useMemo(() => flag, [flag]);

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    (async () => {
      if (flag2 === "new" || flag2 === "continue") {
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

  const handleLeaveMatch = useCallback(async () => {
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
      alert("ERROR WHILE SAVING MATCH: " + err);
    }
  }, [gameData, navigation, username]);

  return (
    <>
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
        <Screen name="settings_ingame" component={SETTINGS_INGAME} />
        <Screen name="stats_ingame" component={STATS_INMATCH} />
        <Screen name="legover" component={FINISH_LEG} />
        <Screen name={"matchover"} component={FINISH_MATCH} />
        <Screen name={"rematch"} component={REMATCH_MODAL} />
        <Screen name={"loadingscreen"} component={LOADING_SCREEN} />
      </Navigator>
    </>
  );
};

export default DRAWER_NAVIGATOR;
