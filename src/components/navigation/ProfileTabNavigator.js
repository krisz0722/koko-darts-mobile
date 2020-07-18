import React from "react";
import TABNAVIGATOR from "./TabNavigator";

const PROFILE_NAVIGATOR_TAB = () => {
  const TABS = [
    {
      route: "friends",
      icon: "person",
      text: "friends",
    },
    {
      route: "matches",
      icon: "list",
      text: "matches",
    },
    {
      route: "timeline",
      icon: "show-chart",
      text: "timeline",
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
