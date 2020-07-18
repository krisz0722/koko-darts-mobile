import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
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

  const SCREENS = [
    {
      component: HOME,
      name: "home",
    },
    {
      component: SETTINGS,
      name: "settings",
    },
    {
      component: PROFILE,
      name: "profile",
    },
  ];

  const transition = () =>
    theme === "default" ? transitionDefault : transitionContrast;

  return (
    <>
      <Navigator
        headerMode="none"
        screenOptions={{
          ...transition(theme.name),
        }}
      >
        <>
          {SCREENS.map((item) => (
            <Screen
              key={item.name}
              name={item.name}
              component={item.component}
            />
          ))}
        </>
      </Navigator>
      <HOMENAVIGATOR_TAB />
    </>
  );
};

export default HomeNavigator;

// TODO this is not real navigation! repalce this with navigation.navigate
