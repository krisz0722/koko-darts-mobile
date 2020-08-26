import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeContext } from "../contexts/ThemeContext";
import transitionContrast from "../styles/navTransitionContrast";
import transitionDefault from "../styles/navTransitionDefault";
import transitionNone from "../styles/navNoTransition";
import REGISTER from "../screens/auth/SignUp";
import LOGIN from "../screens/auth/Login";
import WELCOME from "../screens/auth/Welcome";
import FORGOT_PASSWORD from "../screens/auth/ForgotPassword";

const { Navigator, Screen } = createStackNavigator();

const AuthNavigator = () => {
  const SCREENS = [
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

  const { theme, animation } = useContext(ThemeContext);

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
      {SCREENS.map((item) => (
        <Screen key={item.name} name={item.name} component={item.component} />
      ))}
    </Navigator>
  );
};

export default AuthNavigator;
