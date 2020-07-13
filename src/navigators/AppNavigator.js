import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppearanceProvider } from "react-native-appearance";
import { createStackNavigator } from "@react-navigation/stack";
import { SettingsContext } from "../contexts/SettingsContext";
import { NavigationContext } from "../contexts/NavigationContext";
import HomeNavigator from "./HomeNavigator";
import { LOGIN } from "../screens/Login";
import HOME from "../screens/Home";
import { WELCOME } from "../screens/Welcome";
import transitionContrast from "../styles/navTransitionContrast";
import transitionDefault from "../styles/navTransitionDefault";
import { REGISTER } from "../screens/SignUp";
import GAME_CLASSIC from "../screens/Classic";

const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => {
  const SCREENS = [
    // {
    //   component: HOME,
    //   name: "login",
    // },
    {
      component: GAME_CLASSIC,
      name: "game",
    },
    // {
    //   component: REGISTER,
    //   name: "register",
    // },
    // {
    //   component: LOGIN,
    //   name: "login",
    // },
    // {
    //   component: WELCOME,
    //   name: "welcome",
    // },
    // {
    //   component: HomeNavigator,
    //   name: "homenavigator",
    // },
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
