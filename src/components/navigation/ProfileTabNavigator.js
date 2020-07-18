import React from "react";
import { useNavigation } from "@react-navigation/native";

import TABNAVIGATOR from "./TabNavigator";

const PROFILE_NAVIGATOR_TAB = () => {
  const navigation = useNavigation();
  const TABS = [
    {
      route: "friends",
      icon: "person",
      text: "friends",
      action: () => navigation.navigate("friends"),
    },
    {
      route: "matches",
      icon: "list",
      text: "matches",
      action: () => navigation.navigate("matches"),
    },
    {
      route: "timeline",
      icon: "show-chart",
      text: "timeline",
      action: () => navigation.navigate("timeline"),
    },
  ];
  return (
    <TABNAVIGATOR
      direction={"horizontal"}
      position={"top"}
      tabs={TABS}
      length={3}
    />
  );
};

export default PROFILE_NAVIGATOR_TAB;
