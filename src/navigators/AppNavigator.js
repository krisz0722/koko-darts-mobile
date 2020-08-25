import React, { useContext } from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AppearanceProvider } from "react-native-appearance";
import { createStackNavigator } from "@react-navigation/stack";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { ThemeProvider } from "styled-components";
import { AppBackground } from "../../App";
import { ThemeContext } from "../contexts/ThemeContext";
import transitionContrast from "../styles/navTransitionContrast";
import transitionDefault from "../styles/navTransitionDefault";
import transitionNone from "../styles/navNoTransition";
import HomeNavigator from "./HomeNavigator";
import DrawerNavigator from "./DrawerNavigator";
import AuthNavigator from "./AuthNavigator";
import HomeDrawerNavigator from "./HomeDrawerNavigator";

export const ScreenContainer = styled(SafeAreaView)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.bgOverlay};
`;

const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => {
  const SCREENS = [
    {
      component: AuthNavigator,
      name: "authnavigator",
    },
    {
      component: HomeDrawerNavigator,
      name: "homedrawernavigator",
    },
    {
      component: DrawerNavigator,
      name: "drawernavigator",
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

  return (
    <AppearanceProvider>
      {background ? (
        <AppBackground
          source={require("../../assets/bg.png")}
          resizeMode="cover"
        />
      ) : null}

      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </AppearanceProvider>
  );
};

export default AppNavigator;
