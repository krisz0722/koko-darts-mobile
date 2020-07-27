import React, { useContext, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import GAME_CLASSIC from "../screens/gamewindow/Classic";
import { View } from "react-native";
import NavButton from "../components/buttons/NavButton";
import styled from "styled-components";
import { FlexCol } from "../styles/css_mixins";
import { GameContext } from "../contexts/GameContext";
import SETTINGS_INGAME from "../screens/settings-ingame/SettingsInGame";
import { ThemeContext } from "../contexts/ThemeContext";
import PREGAME_SETTINGS from "../screens/pregame/PreGameSettings";
import LEG_IS_FINISHED from "../screens/endgame/legisfinished/LegIsFinished";
import MATCH_IS_FINISHED from "../screens/endgame/matchisfinished/MatchIsFinished";
import REMATCH from "../screens/endgame/rematch/Rematch";
import LEAVE_MATCH_ALERT from "../components/modals/LeaveMatchAlert";
import { CommonActions } from "@react-navigation/native";

export const DrawerContent = styled(View)`
  ${FlexCol};
  width: 100%;
  top: 30%;
  height: 40%;
  background-color: ${({ theme, inap }) => theme.game[inap + "Bg"]};
`;

const { Navigator, Screen } = createDrawerNavigator();

const DRAWER_CONTENT = ({ navigation, toggleModal, inactivePlayer }) => {
  const { theme } = useContext(ThemeContext);

  const DRAWER_ITEMS = [
    {
      route: "settings",
      icon: "tune",
      action: () => navigation.navigate("settings-ingame"),
    },
    {
      route: "stats",
      icon: "show-chart",
      action: () => navigation.navigate("settings-ingame"),
    },
    {
      route: "home",
      icon: "home",
      action: toggleModal,
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
          direction={"horizontal"}
          text={item.route}
          icon={item.icon}
          action={item.action}
          inap={inactivePlayer}
        />
      ))}
    </DrawerContent>
  );
};

const DrawerNavigator = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);

  const {
    gameData: { activePlayer, inactivePlayer },
  } = useContext(GameContext);

  const drawerstyle = {
    width: "40%",
    backgroundColor: "transparent",
  };

  const [modal, setModal] = useState(false);

  const handleLeaveMatch = () => {
    //TODO save match here to db!

    setModal(false);
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
        drawerContent={(props) => (
          <DRAWER_CONTENT
            toggleModal={() => setModal(!modal)}
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
        <Screen name="stats" component={SETTINGS_INGAME} />
        <Screen name="legisfinished" component={LEG_IS_FINISHED} />
        <Screen name="matchisfinished" component={MATCH_IS_FINISHED} />
        <Screen name="rematch" component={REMATCH} />
      </Navigator>
      <LEAVE_MATCH_ALERT
        action1={() => setModal(!modal)}
        action2={handleLeaveMatch}
        visible={modal}
      />
    </>
  );
};

export default DrawerNavigator;

//TODO navigatio transition!!!
//TODO inactiveplayer prop?
