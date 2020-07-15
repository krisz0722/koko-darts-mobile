import React, { useContext, useState } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import { NavigationContext } from "../../contexts/NavigationContext";
import { TopNavBar } from "./NavBar";
import NavButton from "../buttons/NavButton";

const PROFILE_NAVIGATOR_TAB = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);
  const { setProfileTabScreen } = useContext(NavigationContext);

  const [active, setActive] = useState("friends");

  const handler = (value) => {
    setActive(value);
    setProfileTabScreen(value);
  };

  const DATA = [
    {
      name: "friends",
      icon: "person",
    },
    {
      name: "matches",
      icon: "list",
    },
    {
      name: "timeline",
      icon: "show-chart",
    },
  ];

  return (
    <TopNavBar theme={selectedTheme}>
      {DATA.map((item) => (
        <NavButton
          key={item.name}
          active={active === item.name}
          icon={item.icon}
          iconDir={true}
          action={() => handler(item.name)}
          text={item.name}
          length={3}
        >
          friends
        </NavButton>
      ))}
    </TopNavBar>
  );
};

export default PROFILE_NAVIGATOR_TAB;

// TODO this is not real navigation! repalce this with navigation.navigate
