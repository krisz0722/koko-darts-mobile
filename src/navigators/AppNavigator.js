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
import PREGAME_SETTINGS from "../screens/pregame/PreGameSettings";
import FORGOT_PASSWORD from "../screens/auth/ForgotPassword";
import HomeNavigator from "./HomeNavigator";
import LEG_IS_FINISHED from "../screens/endgame/legisfinished/LegIsFinished";
import MATCH_IS_FINISHED from "../screens/endgame/matchisfinished/MatchIsFinished";
import REMATCH from "../screens/endgame/rematch/Rematch";
import transitionNone from "../styles/navNoTransition";
const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => {
  const SCREENS = [
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
      component: WELCOME,
      name: "welcome",
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
      component: GAME_CLASSIC,
      name: "game",
    },

    {
      component: PREGAME_SETTINGS,
      name: "pregame",
    },
  ];

  const {
    settings: { selectedTheme, animation },
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
    <AppearanceProvider>
      <NavigationContainer theme={navigationTheme}>
        <Navigator
          headerMode="none"
          screenOptions={{
            ...transition(theme.name, animation),
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
