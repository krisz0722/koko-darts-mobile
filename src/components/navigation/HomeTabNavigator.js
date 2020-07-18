import React, { useContext, useEffect, useState } from "react";
import { BackHandler, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SettingsContext } from "../../contexts/SettingsContext";
import NavButton from "../buttons/NavButton";
import { NavBar } from "./NavBar";
import { NavigationContext } from "../../contexts/NavigationContext";

const HOMENAVIGATOR_TAB = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const { homeTabScreen, setHomeTabScreen } = useContext(NavigationContext);

  const navigation = useNavigation();

  const handler = (value) => {
    navigation.navigate(value);
    setHomeTabScreen(value);
  };

  const DATA = [
    {
      name: "home",
      icon: "home",
    },
    {
      name: "settings",
      icon: "tune",
    },
    {
      name: "profile",
      icon: "person",
    },
  ];

  return (
    <NavBar theme={selectedTheme}>
      {DATA.map((item) => (
        <NavButton
          key={item.name}
          active={homeTabScreen === item.name}
          action={() => handler(item.name)}
          icon={item.icon}
          length={3}
          text={item.name}
        />
      ))}
    </NavBar>
  );
};

export default HOMENAVIGATOR_TAB;

// TODO this is not real navigation! repalce this with navigation.navigate
