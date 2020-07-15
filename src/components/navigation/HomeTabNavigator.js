import React, { useContext, useState } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import NavButton from "../buttons/NavButton";
import { NavBar } from "./NavBar";
import { NavigationContext } from "../../contexts/NavigationContext";

const HOMENAVIGATOR_TAB = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);
  const { setHomeTabScreen } = useContext(NavigationContext);

  const [active, setActive] = useState("home");

  const handler = (value) => {
    setActive(value);
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
          active={active === item.name}
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
