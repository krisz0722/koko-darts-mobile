import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppearanceProvider } from "react-native-appearance";
import { createStackNavigator } from "@react-navigation/stack";
const { Navigator, Screen } = createStackNavigator();
import { ThemeProvider } from "styled-components/native";
import { AppBackground } from "../../App";
import { ThemeContext } from "../contexts/ThemeContext";
import IN_GAME_NAVIGATOR from "./DrawerNavigator";
import AUTH_NAVIGATOR from "./AuthNavigator";
import HOME_MAIN_NAVIGATOR from "./HomeDrawerNavigator";
import PLAYER_IS_IN_GAME from "../screens/info/InGame";
import { ScreenContainer } from "./StyledNav";
import transitionContrast from "../styles/navTransitionContrast";
import transitionDefault from "../styles/navTransitionDefault";
import transitionNone from "../styles/navNoTransition";

const APP_NAVIGATOR = () => {
  const {
    theme,
    themeContext: { animation, background },
  } = useContext(ThemeContext);

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
              <Screen name={"authnavigator"} component={AUTH_NAVIGATOR} />
              <Screen
                name={"homedrawernavigator"}
                component={HOME_MAIN_NAVIGATOR}
              />
              <Screen name={"drawernavigator"} component={IN_GAME_NAVIGATOR} />
              <Screen name={"ingame"} component={PLAYER_IS_IN_GAME} />
            </Navigator>
          </NavigationContainer>
        </ScreenContainer>
      </ThemeProvider>
    </AppearanceProvider>
  );
};

export default APP_NAVIGATOR;
