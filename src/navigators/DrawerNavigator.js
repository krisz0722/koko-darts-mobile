import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import GAME_CLASSIC from "../screens/gamewindow/Classic";
import { View } from "react-native";
import NavButton from "../components/buttons/NavButton";
import styled from "styled-components";
import { FlexCol } from "../styles/css_mixins";
import { GameContext } from "../contexts/GameContext";
import SETTINGS_INGAME from "../screens/settings-ingame/SettingsInGame";
import { ThemeContext } from "../contexts/ThemeContext";
import { InGameSettingsContextProvider } from "../contexts/InGameSettingsContext";
import { InGameThemeContextProvider } from "../contexts/InGameThemeContext";
import { InGameOpacityProvider } from "../contexts/InGameOpacityContext";
import PREGAME_SETTINGS from "../screens/pregame/PreGameSettings";

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
      action: () => navigation.navigate("homenavigator"),
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
        />
      ))}
    </DrawerContent>
  );
};

const DrawerNavigator = () => {
  const { theme } = useContext(ThemeContext);

  const {
    gameData: { activePlayer },
  } = useContext(GameContext);

  const drawerstyle = {
    width: "40%",
    backgroundColor: "transparent",
  };

  return (
    <InGameThemeContextProvider>
      <InGameSettingsContextProvider>
        <InGameOpacityProvider>
          <Navigator
            backBehavior={"initialRoute"}
            drawerContent={(props) => <DRAWER_CONTENT {...props} />}
            drawerStyle={drawerstyle}
            drawerPosition={"right"}
            overlayColor={theme.game[activePlayer + "Overlay"]}
          >
            <Screen name="pregame" component={PREGAME_SETTINGS} />
            <Screen name="game" component={GAME_CLASSIC} />
            <Screen name="settings-ingame" component={SETTINGS_INGAME} />
            <Screen name="stats" component={SETTINGS_INGAME} />
          </Navigator>
        </InGameOpacityProvider>
      </InGameSettingsContextProvider>
    </InGameThemeContextProvider>
  );
};

export default DrawerNavigator;

//TODO navigatio transition!!!
//TODO inactiveplayer prop?
