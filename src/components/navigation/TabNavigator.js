import React, { useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SettingsContext } from "../../contexts/SettingsContext";
import NavButton from "../buttons/NavButton";
import { NavigationContext } from "../../contexts/NavigationContext";
import styled from "styled-components";
import { View } from "react-native";
import {
  BorderHorizontal,
  FlexRowAround,
  Window,
} from "../../styles/css_mixins";

export const NavBar = styled(View)`
  ${BorderHorizontal(({ theme }) => theme.borderColor)};
  border-bottom-width: ${({ theme, position }) =>
    position === "top" ? theme.borderWidth : 0};
  position: ${({ position }) => (position === "top" ? "relative" : "absolute")};
  bottom: 0;
  width: 100%;
  height: ${() => Window.height * 0.08};
  ${FlexRowAround};
  border-color: ${({ theme }) => theme.borderColor};
`;

const TABNAVIGATOR = ({ position, tabs, direction, length }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const navigation = useNavigation();
  const route = useRoute().name;

  const { homeTabScreen, setHomeTabScreen } = useContext(NavigationContext);
  const { profileTabScreen, setProfileTabScreen } = useContext(
    NavigationContext,
  );

  const activeScreen =
    route === "homenavigator" ? homeTabScreen : profileTabScreen;

  const handler = (value) => {
    navigation.navigate(value);
    if (route === "homenavigator") {
      setHomeTabScreen(value);
    } else if (route === "profile") {
      setProfileTabScreen(value);
    } else {
    }
  };

  return (
    <NavBar position={position} theme={selectedTheme}>
      {tabs.map((item) => (
        <NavButton
          direction={direction}
          key={item.route}
          active={activeScreen === item.route}
          action={() => handler(item.route)}
          icon={item.icon}
          length={length}
          text={item.text}
        />
      ))}
    </NavBar>
  );
};

export default TABNAVIGATOR;
