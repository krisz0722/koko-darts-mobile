import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppearanceProvider } from "react-native-appearance";
import { createStackNavigator } from "@react-navigation/stack";
import HomeNavigator from "./HomeNavigator";
import { WELCOME } from "../screens/Welcome";
import { SettingsContext } from "../contexts/SettingsContext";
import transitionContrast from "../styles/transitions-contrast";
import transitionDefault from "../styles/transitions-default";
import { NavigationContext } from "../contexts/NavigationContext";
import { REGISTER } from "../screens/SignUp";
import { LOGIN } from "../screens/Login";
import GAME_CLASSIC from "../screens/Classic";
import { HOME } from "../screens/Home";

const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => {
  const SCREENS = [
    {
      component: HOME,
      name: "register",
    },
    {
      component: LOGIN,
      name: "login",
    },
    {
      component: WELCOME,
      name: "welcome",
    },
    {
      component: HomeNavigator,
      name: "homenavigator",
    },
  ];

  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);
  const theme = selectedTheme;

  const { screen } = useContext(NavigationContext);

  const navigationTheme = {
    dark: false,
    colors: {
      primary: theme.bg1,
      background: "transparent",
      card: theme.bg1,
      text: theme.text,
      border: "none",
    },
  };

  const transition = (theme) =>
    theme === "default" ? transitionDefault : transitionContrast;

  return (
    <AppearanceProvider>
      <NavigationContainer theme={navigationTheme}>
        <Navigator
          headerMode="none"
          screenOptions={{
            ...transition(theme.name),
          }}
        >
          {SCREENS.map((item) => (
            <Screen
              key={item.name}
              name={item.name}
              component={item.component}
            />
          ))}
        </Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
};

export default AppNavigator;
