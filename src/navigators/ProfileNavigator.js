import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SettingsContext } from "../contexts/SettingsContext";
import { NavigationContext } from "../contexts/NavigationContext";
import transitionDefault from "../styles/navTransitionDefault";
import transitionContrast from "../styles/navTransitionContrast";
import FRIENDS from "../screens/profile/friends/Friends";
import MATCHES from "../screens/profile/matches/Matches";
import TIMELINE from "../screens/profile/timeline/Timeline";

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
