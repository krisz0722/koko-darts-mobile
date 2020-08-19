import React, { useContext } from "react";
import NavButton from "../components/buttons/NavButton";
import styled from "styled-components";
import { View } from "react-native";
import { BorderVertical, FlexRowAround, Window } from "../styles/css_mixins";
import HOME from "../screens/home/Home";
import SETTINGS from "../screens/settings/Settings";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PROFILE from "../screens/profile/Profile";
import { ThemeContext } from "../contexts/ThemeContext";
import STATS from "../screens/stats/Stats";

export const NavBar = styled(View)`
  ${BorderVertical(({ theme, color }) =>
    color === "dark" ? theme.bg3 : theme.borderColor,
  )};
  border-bottom-width: ${({ theme, position }) =>
    position === "top" ? theme.borderWidth : 0};
  position: ${({ position }) => (position === "top" ? "relative" : "absolute")};
  bottom: 0;
  width: 100%;
  height: ${() => Window.height * 0.08};
  ${FlexRowAround};
`;

const BOTTOM_TABBAR_CONTENT = React.memo((props) => {
  const { theme } = useContext(ThemeContext);

  const { state, navigation, route } = props;

  const TABBAR_ITEMS = [
    {
      index: 0,
      route: "home",
      icon: "home",
      action: () => navigation.navigate("home"),
    },
    {
      index: 1,
      route: "settings",
      icon: "tune",
      action: () => navigation.navigate("settings"),
    },
    {
      index: 2,
      route: "profile",
      icon: "person",
      action: () => navigation.navigate("profile"),
    },
  ];

  const index = state.index;

  return (
    <>
      {index === 3 ? null : (
        <NavBar position={"bottom"} theme={theme}>
          {TABBAR_ITEMS.map((item) => (
            <NavButton
              key={item.route}
              length={3}
              direction={"column"}
              text={item.route}
              icon={item.icon}
              action={item.action}
              active={index === item.index}
            />
          ))}
        </NavBar>
      )}
    </>
  );
});

const HomeNavigator = () => {
  const { Screen, Navigator } = createMaterialTopTabNavigator();

  return (
    <>
      <Navigator
        timingConfig={{ duration: 1 }}
        tabBarPosition={"bottom"}
        tabBar={(props) => <BOTTOM_TABBAR_CONTENT {...props} />}
      >
        <Screen name="home" component={HOME} />
        <Screen name="settings" component={SETTINGS} />
        <Screen name="profile" component={PROFILE} />
        <Screen name="stats_saved" component={STATS} />
      </Navigator>
    </>
  );
};

export default HomeNavigator;
