import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppearanceProvider } from "react-native-appearance";
import { createStackNavigator } from "@react-navigation/stack";
import { SettingsContextProvider } from "../contexts/SettingsContext";
import transitionContrast from "../styles/navTransitionContrast";
import transitionDefault from "../styles/navTransitionDefault";
import REGISTER from "../screens/auth/SignUp";
import LOGIN from "../screens/auth/Login";
import WELCOME from "../screens/welcome/Welcome";
import PREGAME_SETTINGS from "../screens/pregame/PreGameSettings";
import FORGOT_PASSWORD from "../screens/auth/ForgotPassword";
import HomeNavigator from "./HomeNavigator";
import LEG_IS_FINISHED from "../screens/endgame/legisfinished/LegIsFinished";
import MATCH_IS_FINISHED from "../screens/endgame/matchisfinished/MatchIsFinished";
import REMATCH from "../screens/endgame/rematch/Rematch";
import DrawerNavigator from "./DrawerNavigator";
import { ThemeProvider } from "styled-components";
import { ScreenContainer } from "../screens/router/StyledRouter";
const { Navigator, Screen } = createStackNavigator();
import { ThemeContext } from "../contexts/ThemeContext";
import { GameContextProvider } from "../contexts/GameContext";
import { OpacityProvider } from "../contexts/OpacityContext";

const AppNavigator = () => {
  const SCREENS = [
    {
      component: WELCOME,
      name: "welcome",
    },
    {
      component: DrawerNavigator,
      name: "drawernavigator",
    },
    {
      component: HomeNavigator,
      name: "homenavigator",
    },
    {
      component: LEG_IS_FINISHED,
      name: "legisfinished",
    },
    {
      component: REMATCH,
      name: "rematch",
    },

    {
      component: MATCH_IS_FINISHED,
      name: "matchisfinished",
    },

    {
      component: REGISTER,
      name: "register",
    },
    {
      component: LOGIN,
      name: "login",
    },
    {
      component: FORGOT_PASSWORD,
      name: "forgotpassword",
    },
    {
      component: PREGAME_SETTINGS,
      name: "pregame",
    },
  ];

  const { theme } = useContext(ThemeContext);

  const navigationTheme = {
    dark: false,
    colors: {
      primary: theme.bg1,

      card: theme.bg1,
      text: theme.text,
      border: "none",
    },
  };

  const transition = (theme) => {
    if (theme === "default") {
      return transitionDefault;
    } else {
      return transitionContrast;
    }
  };

  console.log("RENDER APPNAVIAGATOR ");

  return (
    <AppearanceProvider>
      <ScreenContainer theme={theme}>
        <ThemeProvider theme={theme}>
          <SettingsContextProvider>
            <OpacityProvider>
              <GameContextProvider>
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
              </GameContextProvider>
            </OpacityProvider>
          </SettingsContextProvider>
        </ThemeProvider>
      </ScreenContainer>
    </AppearanceProvider>
  );
};

export default AppNavigator;

//TODO appnavigator renders on every settingscontext change --> change this
