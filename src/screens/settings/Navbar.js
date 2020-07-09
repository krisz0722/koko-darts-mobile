import React, { useContext } from "react";

import { GameContext } from "../../contexts/GameContext";
import { SettingsContext } from "../../contexts/SettingsContext";
import NavButton from "../../components/NavButton";
import NavBar from "../../components/NavBar";

export const NAVBAR = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);
  const {
    gameData: { p1, p2 },
  } = useContext(GameContext);

  const screen = "/settings";
  const isReady = true;
  const leftBtn = screen === "/settings_ingame" ? "/menu_ingame" : "/menu_main";

  return (
    <NavBar theme={selectedTheme}>
      <NavButton
        text={screen === "/settings_ingame" ? "back to the menu" : "main menu"}
      />

      {screen === "/settings" ? (
        <NavButton text={"reset"} />
      ) : screen === "/settings_new" && isReady ? (
        <NavButton text={"game on!"} />
      ) : screen === "/settings_new" && !isReady ? (
        <NavButton text={"add opponent"} />
      ) : null}
    </NavBar>
  );
};
