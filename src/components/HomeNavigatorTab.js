import React, { useState, useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { SettingsContext } from "../contexts/SettingsContext";
import NavButton from "./NavButton";
import NavBar from "./NavBar";
import { NavigationContext } from "../contexts/NavigationContext";

const HOMENAVIGATOR_TAB = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);
  const {
    gameData: { p1, p2 },
  } = useContext(GameContext);
  const { screen, setScreen } = useContext(NavigationContext);

  const [valami, setValami] = useState(screen);

  const navigate = (route) => {
    setValami(route);
    setScreen(route);
  };

  return (
    <NavBar theme={selectedTheme}>
      <NavButton
        action={() => navigate("home")}
        icon={"home"}
        length={3}
        text={"home"}
      />
      <NavButton
        action={() => navigate("settings")}
        icon={"tune"}
        length={3}
        text={"settings"}
      />
      <NavButton
        action={() => navigate("profile")}
        icon={"person"}
        length={3}
        text={"profile"}
      />
    </NavBar>
  );
};

export default HOMENAVIGATOR_TAB;
