import React, { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContext } from "../contexts/NavigationContext";
import { SettingsContext } from "../contexts/SettingsContext";
import transitionContrast from "../styles/navTransitionContrast";
import transitionDefault from "../styles/navTransitionDefault";
import SETTINGS from "../screens/settings/Settings";
import HOME from "../screens/home/Home";
import PROFILE from "../screens/profile/Profile";
import HOMENAVIGATOR_TAB from "../components/navigation/HomeTabNavigator";

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);
  const theme = selectedTheme;

  const { homeTabScreen } = useContext(NavigationContext);

  const SCREENS = {
    home: {
      component: HOME,
      name: "home",
    },
    settings: {
      component: SETTINGS,
      name: "settings",
    },
    profile: {
      component: PROFILE,
      name: "profile",
    },
  };

  const transition = (theme) =>
    theme === "default" ? transitionDefault : transitionContrast;

  return (
    <>
      <Navigator
        headerMode="none"
        screenOptions={{
          ...transition(theme.name),
        }}
      >
        <Screen
          name={SCREENS[homeTabScreen].name}
          component={SCREENS[homeTabScreen].component}
        />
      </Navigator>
      <HOMENAVIGATOR_TAB />
    </>
  );
};

export default HomeNavigator;
