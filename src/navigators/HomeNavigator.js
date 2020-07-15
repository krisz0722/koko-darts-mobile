import React, { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SETTINGS } from "../screens/Settings";
import { SettingsContext } from "../contexts/SettingsContext";
import transitionContrast from "../styles/navTransitionContrast";
import transitionDefault from "../styles/navTransitionDefault";
import { NavigationContext } from "../contexts/NavigationContext";
import GAME_CLASSIC from "../screens/Classic";
import HOME from "../screens/Home";
import { PROFILE } from "../screens/Profile";
import HOMENAVIGATOR_TAB from "../components/HomeTabNavigator";

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);
  const theme = selectedTheme;

  const { homeTabScreen, setHomeTabScreen, setShowTab } = useContext(
    NavigationContext,
  );

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

  useEffect(() => {
    setShowTab(true);
  }, []);

  const transition = (theme) =>
    theme === "default" ? transitionDefault : transitionContrast;

  console.log(homeTabScreen);

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
