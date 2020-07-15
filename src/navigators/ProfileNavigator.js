import React, { useContext } from "react";
import { SettingsContext } from "../contexts/SettingsContext";
import Icon from "react-native-vector-icons/MaterialIcons";
import GAME_CLASSIC from "../screens/Classic";
import { NavigationContext } from "../contexts/NavigationContext";
import { SETTINGS } from "../screens/Settings";
import transitionDefault from "../styles/navTransitionDefault";
import transitionContrast from "../styles/navTransitionContrast";
import FRIENDS from "../screens/Friends";
import { createStackNavigator } from "@react-navigation/stack";
import MATCHES from "../screens/Matches";
import TIMELINE from "../screens/Timeline";

const { Navigator, Screen } = createStackNavigator();

const ProfileNavigator = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);
  const theme = selectedTheme;

  const { profileTabScreen } = useContext(NavigationContext);

  const SCREENS = {
    friends: {
      component: FRIENDS,
      name: "friends",
    },
    matches: {
      component: MATCHES,
      name: "matches",
    },
    timeline: {
      component: TIMELINE,
      name: "timeline",
    },
  };

  const transition = (theme) =>
    theme === "default" ? transitionDefault : transitionContrast;

  return (
    <Navigator
      headerMode="none"
      screenOptions={{
        ...transition(theme.name),
      }}
    >
      <Screen
        name={SCREENS[profileTabScreen].name}
        component={SCREENS[profileTabScreen].component}
      />
    </Navigator>
  );
};

export default ProfileNavigator;
