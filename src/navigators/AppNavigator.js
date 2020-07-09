import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppearanceProvider } from "react-native-appearance";
import { createStackNavigator } from "@react-navigation/stack";
import { REGISTER } from "../screens/SignUp";
import { WELCOME } from "../screens/Welcome";
import { SETTINGS } from "../screens/Settings";
import { SettingsContext } from "../contexts/SettingsContext";
const { Navigator, Screen } = createStackNavigator();
import transitionContrast from "../styles/transitions-contrast";
import transitionDefault from "../styles/transitions-default";

const AppNavigator = () => {
  const SCREENS = [
    {
      component: REGISTER,
      name: "register",
      icon: "home",
      title: "Home",
      headerShown: true,
    },
    {
      component: SETTINGS,
      name: "settings",
      icon: "Home",
      title: "Settings",
      headerShown: true,
    },
    {
      component: WELCOME,
      name: "welcome",
      icon: "Home",
      title: "Profile",
      headerShown: false,
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

  const headerStyle = {
    headerStyle: {
      backgroundColor: "transparent",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      alignSelf: "center",
      textTransform: "uppercase",
      fontFamily: theme.fontFamily,
      color: theme.text,
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
            headerStyle,
            ...transition(theme.name),
          }}
        >
          {SCREENS.map((item) => (
            <Screen
              options={{
                headerShown: item.headerShown,
              }}
              key={item.key}
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
