import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppearanceProvider } from "react-native-appearance";
import { createStackNavigator } from "@react-navigation/stack";
import { SettingsContext } from "../contexts/SettingsContext";
import transitionContrast from "../styles/navTransitionContrast";
import transitionDefault from "../styles/navTransitionDefault";
import GAME_CLASSIC from "../screens/gamewindow/Classic";
import REGISTER from "../screens/auth/SignUp";
import LOGIN from "../screens/auth/Login";
import WELCOME from "../screens/welcome/Welcome";
import HomeNavigator from "./HomeNavigator";
import PREGAME_SETTINGS from "../screens/pregame/PreGameSettings";
import FORGOT_PASSWORD from "../screens/auth/ForgotPassword";
const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => {
  const SCREENS = [
    // {
    //   component: WELCOME,
    //   name: "welcome",
    // },
    // {
    //   component: REGISTER,
    //   name: "register",
    // },
    // {
    //   component: LOGIN,
    //   name: "login",
    // },
    // {
    //   component: FORGOT_PASSWORD,
    //   name: "forgotpassword",
    // },
    {
      component: GAME_CLASSIC,
      name: "game",
    },
    {
      component: HomeNavigator,
      name: "homenavigator",
    },
    {
      component: PREGAME_SETTINGS,
      name: "pregame",
    },
  ];

  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);
  const theme = selectedTheme;

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
