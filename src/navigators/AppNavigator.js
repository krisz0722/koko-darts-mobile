import React, { useContext } from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AppearanceProvider } from "react-native-appearance";
import { createStackNavigator } from "@react-navigation/stack";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { ThemeProvider } from "styled-components";
import { AppBackground } from "../../App";
import { ThemeContext } from "../contexts/ThemeContext";
import { SettingsContextProvider } from "../contexts/SettingsContext";
import { GameContextProvider } from "../contexts/GameContext";
import { InGameSettingsContextProvider } from "../contexts/InGameSettingsContext";
import transitionContrast from "../styles/navTransitionContrast";
import transitionDefault from "../styles/navTransitionDefault";
import transitionNone from "../styles/navNoTransition";
import REGISTER from "../screens/auth/SignUp";
import LOGIN from "../screens/auth/Login";
import WELCOME from "../screens/welcome/Welcome";
import FORGOT_PASSWORD from "../screens/auth/ForgotPassword";
import HomeNavigator from "./HomeNavigator";
import DrawerNavigator from "./DrawerNavigator";

export const ScreenContainer = styled(SafeAreaView)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.bgOverlay};
`;

const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => {
  const SCREENS = [
    {
      component: HomeNavigator,
      name: "homenavigator",
    },
    {
      component: DrawerNavigator,
      name: "drawernavigator",
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
  ];

  const { theme, animation, background } = useContext(ThemeContext);

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
    if (animation) {
      if (theme === "default") {
        return transitionDefault;
      } else {
        return transitionContrast;
      }
    } else {
      return transitionNone;
    }
  };

  // console.log("RENDER APPNAVIAGATOR ");

  return (
    <AppearanceProvider>
      {background ? (
        <AppBackground
          source={require("../../assets/bgPortrait.jpeg")}
          resizeMode="cover"
        />
      ) : null}

      <ThemeProvider theme={theme}>
        <SettingsContextProvider>
          <InGameSettingsContextProvider>
            <GameContextProvider>
              <ScreenContainer theme={theme}>
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
              </ScreenContainer>
            </GameContextProvider>
          </InGameSettingsContextProvider>
        </SettingsContextProvider>
      </ThemeProvider>
    </AppearanceProvider>
  );
};

export default AppNavigator;
