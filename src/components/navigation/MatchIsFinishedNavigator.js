import React from "react";
import { useNavigation } from "@react-navigation/native";
import TABNAVIGATOR from "./TabNavigator";

const MATCH_IS_FINISHED_NAVIGATOR = () => {
  const navigation = useNavigation();

  const TABS = [
    {
      route: "homenavigator",
      text: "quit match",
      icon: "arrow-back",
      action: () => navigation.navigate("home"),
    },

    {
      route: "game",
      text: "show stats",
      icon: "show-chart",
      action: () => navigation.navigate("game"),
    },
    {
      route: "rematch",
      text: "rematch",
      icon: "dart",
      action: () => navigation.navigate("rematch"),
    },
  ];
  return (
    <TABNAVIGATOR
      position={"bottom"}
      direction={"horizontal"}
      tabs={TABS}
      length={3}
      color={"dark"}
    />
  );
};

export default MATCH_IS_FINISHED_NAVIGATOR;
