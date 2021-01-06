import React, {
  useRef,
  useCallback,
  useMemo,
  useEffect,
  useContext,
} from "react";
import { AppState } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
const { Navigator, Screen } = createDrawerNavigator();
import { useRoute } from "@react-navigation/native";
import { GameContext } from "../contexts/GameContext";
import { Authcontext } from "../contexts/AuthContext";
import GAME_WINDOW from "../screens/gamewindow/Classic";
import DRAWER_CONTENT from "./DrawerContent";
import SETTINGS_INGAME from "../screens/settings/ingame/SettingsInGame";
import FINISH_LEG from "../screens/endgame/FinishLeg";
import FINISH_MATCH from "../screens/endgame/FinishMatch";
import REMATCH from "../screens/endgame/Rematch";
import LOADING_SCREEN from "../screens/info/LoadingScreen";
import STATS_INGAME from "../screens/stats/StatsInMatch";
import updateAuthMatchesSave from "../contexts/actions/authContext/UpdateMatchesSave";

const IN_GAME_NAVIGATOR = React.memo(({ navigation }) => {
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
    dispatchUserData,
    userData: { id },
  } = useContext(Authcontext);

  const params = useRoute().params;
  const { flag } = params;
  const flag2 = useMemo(() => flag, [flag]);

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    (async () => {
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
        (appState.current === "inactive" && gameData.initializedBy === id)
      ) {
        const updatedUserData = await updateAuthMatchesSave(
          gameData,
          id,
          false,
          navigation,
          "leave",
        );
        dispatchUserData({ type: "UPDATE_PROFILE", value: updatedUserData });
      }
    };

    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, [dispatchGameData, dispatchUserData, id, navigation, gameData]);

  const drawerstyle = {
    width: "40%",
    backgroundColor: "transparent",
  };

  const handleLeaveMatch = useCallback(async () => {
    try {
      const updatedUserData = await updateAuthMatchesSave(
        gameData,
        id,
        false,
        navigation,
        "leave",
      );

      dispatchUserData({ type: "UPDATE_PROFILE", value: updatedUserData });
    } catch (err) {
      console.log(err);
      alert("ERROR WHILE SAVING MATCH: " + err);
    }
  }, [dispatchUserData, id, gameData, navigation]);

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
        <Screen name="game" component={GAME_WINDOW} />
        <Screen name="settings_ingame" component={SETTINGS_INGAME} />
        <Screen name="stats_ingame" component={STATS_INGAME} />
        <Screen name="legover" component={FINISH_LEG} />
        <Screen name={"matchover"} component={FINISH_MATCH} />
        <Screen name={"rematch"} component={REMATCH} />
        <Screen name={"loadingscreen"} component={LOADING_SCREEN} />
      </Navigator>
    </>
  );
});

export default IN_GAME_NAVIGATOR;
