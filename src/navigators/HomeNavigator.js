import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { WELCOME } from "../screens/Welcome";
import { SETTINGS } from "../screens/Settings";
import { HOME } from "../screens/Home";
import { SettingsContext } from "../contexts/SettingsContext";
import transitionContrast from "../styles/transitions-contrast";
import transitionDefault from "../styles/transitions-default";
import { PROFILE } from "../screens/Profile";
import { NavigationContext } from "../contexts/NavigationContext";

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => {
  const SCREENS = {
    home: {
      component: HOME,
      name: "home",
    },
    settings: {
      component: SETTINGS,
      name: "settings",
    },
    welcome: {
      component: WELCOME,
      name: "welcome",
    },
    profile: {
      component: PROFILE,
      name: "profile",
    },
  };

  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);
  const theme = selectedTheme;

  const { screen } = useContext(NavigationContext);

  const transition = (theme) =>
    theme === "default" ? transitionDefault : transitionContrast;

  return (
    <Navigator
      headerMode="none"
      screenOptions={{
        ...transition(theme.name),
      }}
    >
      <Screen
        name={SCREENS[screen].name}
        component={SCREENS[screen].component}
      />
    </Navigator>
  );
};

export default HomeNavigator;
