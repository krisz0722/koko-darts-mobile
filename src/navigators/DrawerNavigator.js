import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import GAME_CLASSIC from "../screens/gamewindow/Classic";
import { SettingsContext } from "../contexts/SettingsContext";
import { View } from "react-native";
import NavButton from "../components/buttons/NavButton";
import styled from "styled-components";
import { FlexCol } from "../styles/css_mixins";
import { GameContext } from "../contexts/GameContext";
import SETTINGS_INGAME from "../screens/settings-ingame/SettingsInGame";

export const DrawerContent = styled(View)`
  ${FlexCol};
  width: 100%;
  top: 30%;
  height: 40%;
  background-color: ${({ theme, inap }) => theme.game[inap + "Bg"]};
`;

const { Navigator, Screen } = createDrawerNavigator();

const DRAWER_CONTENT = ({ navigation }) => {
  const {
    gameData: { inactivePlayer },
  } = useContext(GameContext);

  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

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
      action: () => navigation.navigate("homenavigator"),
    },
  ];

  return (
    <DrawerContent theme={selectedTheme} inap={inactivePlayer}>
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
        />
      ))}
    </DrawerContent>
  );
};

const DrawerNavigator = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const {
    gameData: { activePlayer },
  } = useContext(GameContext);

  const drawerstyle = {
    width: "40%",
    backgroundColor: "transparent",
  };

  return (
    <Navigator
      backBehavior={"initialRoute"}
      drawerContent={(props) => <DRAWER_CONTENT {...props} />}
      drawerStyle={drawerstyle}
      drawerPosition={"right"}
      overlayColor={selectedTheme.game[activePlayer + "Overlay"]}
    >
      <Screen name="game" component={GAME_CLASSIC} />
      <Screen name="settings-ingame" component={SETTINGS_INGAME} />
      <Screen name="stats" component={SETTINGS_INGAME} />
    </Navigator>
  );
};

export default DrawerNavigator;

//TODO navigatio transition!!!
