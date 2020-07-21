import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import NavButton from "../buttons/NavButton";
import styled from "styled-components";
import { View } from "react-native";
import {
  BorderHorizontal,
  FlexRowAround,
  Window,
} from "../../styles/css_mixins";
import HOME from "../../screens/home/Home";
import SETTINGS from "../../screens/settings/Settings";
import PROFILE from "../../screens/profile/Profile";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

export const NavBar = styled(View)`
  ${BorderHorizontal(({ theme, color }) =>
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

const BOTTOM_TABBAR_CONTENT = ({ navigation }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const TABBAR_ITEMS = [
    {
      route: "home",
      icon: "home",
      action: () => navigation.navigate("home"),
    },
    {
      route: "settings",
      icon: "tune",
      action: () => navigation.navigate("settings"),
    },
    {
      route: "profile",
      icon: "profile",
      action: () => navigation.navigate("profile"),
    },
  ];

  return (
    <NavBar theme={selectedTheme}>
      {TABBAR_ITEMS.map((item) => (
        <NavButton
          key={item.route}
          color={"drawer"}
          height={10}
          length={3}
          direction={"horizontal"}
          text={item.route}
          icon={item.icon}
          action={item.action}
        />
      ))}
    </NavBar>
  );
};

const BottomTabNavigator = () => {
  const { Screen, Navigator } = createMaterialTopTabNavigator();
  console.log("TABNAVIGATOR ");
  console.log("RENDER TABNAVIGATOR");

  return (
    <Navigator
      tabBarPosition={"bottom"}
      tabBar={(props) => <BOTTOM_TABBAR_CONTENT {...props} />}
    >
      <Screen name="home" component={HOME} />
      <Screen name="settings" component={SETTINGS} />
      <Screen name="profile" component={PROFILE} />
    </Navigator>
  );
};

export default BottomTabNavigator;
