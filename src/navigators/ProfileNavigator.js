import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SettingsContext } from "../contexts/SettingsContext";
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

  const SCREENS = [
    {
      component: FRIENDS,
      name: "friends",
    },
    {
      component: MATCHES,
      name: "matches",
    },
    {
      component: TIMELINE,
      name: "timeline",
    },
  ];

  const transition = (theme) =>
    theme === "default" ? transitionDefault : transitionContrast;

  return (
    <Navigator
      headerMode="none"
      screenOptions={{
        ...transition(theme.name),
      }}
    >
      <>
        {SCREENS.map((item) => (
          <Screen key={item.name} name={item.name} component={item.component} />
        ))}
      </>
    </Navigator>
  );
};

export default ProfileNavigator;

// TODO this is not real navigation! repalce this with navigation.navigate
