import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SettingsContext } from "../contexts/SettingsContext";
import transitionContrast from "../styles/navTransitionContrast";
import transitionDefault from "../styles/navTransitionDefault";
import SETTINGS from "../screens/settings/Settings";
import HOME from "../screens/home/Home";
import PROFILE from "../screens/profile/Profile";
import HOME_TAB_NAVIGATOR from "../components/navigation/HomeTabNavigator";
import transitionNone from "../styles/navNoTransition";

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => {
  const {
    settings: { selectedTheme, animation },
  } = useContext(SettingsContext);
  const theme = selectedTheme;

  const SCREENS = [
    {
      component: PROFILE,
      name: "profile",
    },
    {
      component: HOME,
      name: "home",
    },
    {
      component: SETTINGS,
      name: "settings",
    },
  ];

  const transition = (theme, animation) => {
    if (animation) {
      if (theme === "default") {
        return transitionDefault;
      } else {
        return transitionContrast;
      }
    }

    return transitionNone;
  };

  return (
    <>
      <Navigator
        headerMode="none"
        screenOptions={{
          ...transition(theme.name, animation),
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
      <HOME_TAB_NAVIGATOR />
    </>
  );
};

export default HomeNavigator;
