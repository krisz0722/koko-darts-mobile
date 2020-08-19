import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import GAME_CLASSIC from "../screens/gamewindow/Classic";
import { View } from "react-native";
import NavButton from "../components/buttons/NavButton";
import styled from "styled-components";
import { FlexCol } from "../styles/css_mixins";
import { GameContext } from "../contexts/GameContext";
import SETTINGS_INGAME from "../screens/settings-ingame/SettingsInGame";
import PREGAME_SETTINGS from "../screens/pregame/PreGameSettings";
import { CommonActions } from "@react-navigation/native";
import STATS from "../screens/stats/Stats";
import { Authcontext } from "../contexts/AuthContext";
import { updateMatches } from "../fb/crud";

export const DrawerContent = styled(View)`
  ${FlexCol};
  width: 100%;
  top: 30%;
  height: 40%;
  background-color: ${({ theme, inap }) => theme.game[inap + "Bg"]};
`;

const { Navigator, Screen } = createDrawerNavigator();

const DRAWER_CONTENT = ({
  navigation,
  handleLeaveMatch,
  inactivePlayer,
  gameData,
  theme,
}) => {
  const DRAWER_ITEMS = [
    {
      route: "settings",
      icon: "tune",
      action: () => navigation.navigate("settings-ingame"),
    },
    {
      route: "stats",
      icon: "show-chart",
      action: () => navigation.navigate("stats", { gameData, back: "game" }),
    },
    {
      route: "home",
      icon: "home",
      action: () => handleLeaveMatch(),
    },
  ];

  return (
    <DrawerContent theme={theme} inap={inactivePlayer}>
      {DRAWER_ITEMS.map((item) => (
        <NavButton
          key={item.route}
          color={"drawer"}
          height={10}
          length={3}
          direction={"row"}
          text={item.route}
          icon={item.icon}
          action={item.action}
          inap={inactivePlayer}
          inGameTheme={theme}
        />
      ))}
    </DrawerContent>
  );
};

const DrawerNavigator = ({ navigation }) => {
  const {
    gameData,
    gameData: {
      settings: { theme },
      activePlayer,
      inactivePlayer,
    },
  } = useContext(GameContext);
  const {
    dispatchUserData,
    userData: { matches },
  } = useContext(Authcontext);

  const drawerstyle = {
    width: "40%",
    backgroundColor: "transparent",
  };

  const handleLeaveMatch = async () => {
    try {
      if (matches[0] && matches[0].status === "pending") {
        matches[0] = { ...gameData, status: "pending" };
      } else {
        matches.unshift({ ...gameData, status: "pending" });
      }
      await dispatchUserData({ type: "UPDATE_MATCHES_SAVE", value: matches });
    } catch (err) {
      alert("ERROR WHILE SAVING MATCH: ", err);
    }

    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "homenavigator" }],
      }),
    );
  };

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
        <Screen name="pregame" component={PREGAME_SETTINGS} />
        <Screen name="game" component={GAME_CLASSIC} />
        <Screen name="settings-ingame" component={SETTINGS_INGAME} />
        <Screen name="stats" component={STATS} />
      </Navigator>
      {/*<LEAVE_MATCH_ALERT*/}
      {/*  action1={() => setModal(!modal)}*/}
      {/*  action2={handleLeaveMatch}*/}
      {/*  visible={modal}*/}
      {/*/>*/}
    </>
  );
};

export default DrawerNavigator;

//TODO navigatio transition!!!
//TODO inactiveplayer prop?
