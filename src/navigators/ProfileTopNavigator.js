import React, { useContext } from "react";
import NavButton from "../components/buttons/NavButton";
import styled from "styled-components";
import { View } from "react-native";
import { BorderHorizontal, FlexRowAround, Window } from "../styles/css_mixins";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FRIENDS_SCREEN from "../screens/profile/friends/friends/Friends_Screen";
import MATCHES from "../screens/profile/matches/Matches";
import TIMELINE from "../screens/profile/timeline/Timeline";
import { ThemeContext } from "../contexts/ThemeContext";

export const NavBar = styled(View)`
  ${BorderHorizontal(({ theme, color }) =>
    color === "dark" ? theme.bg3 : theme.borderColor,
  )};
  border-bottom-width: ${({ theme, position }) =>
    position === "top" ? theme.borderWidth : 0};
  position: relative;
  width: 100%;
  height: ${() => Window.height * 0.08};
  ${FlexRowAround};
`;

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
    <NavBar position={"top"} theme={theme}>
      {TABBAR_ITEMS.map((item) => (
        <NavButton
          key={item.route}
          length={3}
          direction={"horizontal"}
          text={item.route}
          icon={item.icon}
          action={item.action}
          active={index === item.index}
        />
      ))}
    </NavBar>
  );
});

const ProfileNavigator = React.memo((props) => {
  const { Screen, Navigator } = createMaterialTopTabNavigator();

  return (
    <Navigator tabBar={(props) => <PROFILE_TABBAR_CONTENT {...props} />}>
      <Screen name="friends" component={FRIENDS_SCREEN} />
      <Screen name="matches" component={MATCHES} />
      <Screen name="timeline" component={TIMELINE} />
    </Navigator>
  );
});

export default ProfileNavigator;
