import React from "react";
import { useNavigation } from "@react-navigation/native";
import TABNAVIGATOR from "./TabNavigator";

const HOME_TAB_NAVIGATOR = () => {
  const navigation = useNavigation();

  const TABS = [
    {
      route: "home",
      icon: "home",
      text: "home",
      action: () => navigation.navigate("home"),
    },
    {
      route: "settings",
      icon: "tune",
      text: "settings",
      action: () => navigation.navigate("settings"),
    },
    {
      route: "profile",
      icon: "person",
      text: "profile",
      action: () => navigation.navigate("profile"),
    },
  ];
  return (
    <TABNAVIGATOR
      position={"bottom"}
      direction={"vertical"}
      tabs={TABS}
      length={3}
    />
  );
};

export default HOME_TAB_NAVIGATOR;
