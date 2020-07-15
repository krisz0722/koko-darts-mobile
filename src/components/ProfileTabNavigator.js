import React, { useContext, useState } from "react";
import { SettingsContext } from "../contexts/SettingsContext";
import NavBar from "./NavBar";
import { NavigationContext } from "../contexts/NavigationContext";
import styled from "styled-components";
import { BorderHorizontal } from "../styles/css_mixins";
import TOPNAV_BUTTON from "./ProfileNavButton";

const TopNavBar = styled(NavBar)`
  position: relative;
  top: 0;
  ${BorderHorizontal(({ theme }) => theme.borderColor)};
`;

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

  return (
    <TopNavBar theme={selectedTheme}>
      <TOPNAV_BUTTON
        active={active === "friends"}
        icon={"person"}
        value={"friends"}
        action={handler}
      >
        friends
      </TOPNAV_BUTTON>
      <TOPNAV_BUTTON
        active={active === "matches"}
        icon={"list"}
        value={"matches"}
        action={handler}
      >
        matches
      </TOPNAV_BUTTON>
      <TOPNAV_BUTTON
        active={active === "timeline"}
        icon={"show-chart"}
        value={"timeline"}
        action={handler}
      >
        timeline
      </TOPNAV_BUTTON>
    </TopNavBar>
  );
};

export default PROFILE_NAVIGATOR_TAB;
