import React from "react";
import TABNAVIGATOR from "./TabNavigator";

const HOME_TAB_NAVIGATOR = () => {
  const TABS = [
    {
      route: "home",
      icon: "home",
      text: "home",
    },
    {
      route: "settings",
      icon: "tune",
      text: "settings",
    },
    {
      route: "profile",
      icon: "person",
      text: "profile",
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
