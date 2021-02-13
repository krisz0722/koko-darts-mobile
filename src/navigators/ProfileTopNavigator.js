import React, { useContext } from "react";
import NAV_BUTTON from "../components/buttons/NavButton";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Friends from "../screens/profile/Friends";
import LIST_MATCHES from "../components/lists/ListMatches";
import TIMELINE from "../screens/profile/Timeline";
import { ThemeContext } from "../contexts/ThemeContext";
import { TopNavBar } from "./StyledNav";

const PROFILE_TABBAR_CONTENT = React.memo(({ navigation, state }) => {
  const { theme } = useContext(ThemeContext);

  const TABBAR_ITEMS = [
    {
      index: 0,
      route: "friends",
      icon: "person",
      action: () => navigation.navigate("friends"),
    },
    {
      index: 1,
      route: "matches",
      icon: "list",
      action: () => navigation.navigate("matches"),
    },
    {
      index: 2,
      route: "timeline",
      icon: "show-chart",
      action: () => navigation.navigate("timeline"),
    },
  ];

  const index = state.index;

  return (
    <TopNavBar position={"top"} theme={theme}>
      {TABBAR_ITEMS.map((item) => (
        <NAV_BUTTON
          key={item.route}
          length={3}
          direction={"row"}
          text={item.route}
          icon={item.icon}
          action={item.action}
          active={index === item.index}
        />
      ))}
    </TopNavBar>
  );
});

const PROFILE_NAVIGATOR = React.memo(() => {
  const { Screen, Navigator } = createMaterialTopTabNavigator();

  return (
    <Navigator tabBar={(props) => <PROFILE_TABBAR_CONTENT {...props} />}>
      <Screen name="friends" component={Friends} />
      <Screen name="matches" component={LIST_MATCHES} />
      <Screen name="timeline" component={TIMELINE} />
    </Navigator>
  );
});

export default PROFILE_NAVIGATOR;
