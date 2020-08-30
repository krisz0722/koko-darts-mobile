import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeContext } from "../contexts/ThemeContext";
import transitionContrast from "../styles/navTransitionContrast";
import transitionDefault from "../styles/navTransitionDefault";
import transitionNone from "../styles/navNoTransition";
import REGISTER from "../screens/auth/SignUp";
import LOGIN from "../screens/auth/Login";
import WELCOME from "../screens/auth/Welcome";
import LOADING_SCREEN from "../screens/info/LoadingScreen";
import AUTH_ERROR_SCREEN from "../screens/contact/ErrorScreen";
import AUTH_CONTACT from "../screens/contact/AuthReportBug";

const { Navigator, Screen } = createStackNavigator();

const AUTH_NAVIGATOR = () => {
  const {
    theme,

    themeContext: { animation },
  } = useContext(ThemeContext);

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
    <Navigator
      headerMode="none"
      screenOptions={{
        ...transition(theme.name),
      }}
    >
      <Screen name={"welcome"} component={WELCOME} />
      <Screen name={"register"} component={REGISTER} />
      <Screen name={"login"} component={LOGIN} />
      <Screen name={"loadingscreen"} component={LOADING_SCREEN} />
      <Screen name={"errorscreen"} component={AUTH_ERROR_SCREEN} />
      <Screen name={"reportbug"} component={AUTH_CONTACT} />
    </Navigator>
  );
};

export default AUTH_NAVIGATOR;
