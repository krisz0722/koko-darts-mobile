import React, { useContext } from "react";
import { SettingsContext } from "../contexts/SettingsContext";
import { HeaderWelcome } from "../components/containers/Home";

const TIMELINE = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  return <HeaderWelcome theme={selectedTheme}>TIMELINE</HeaderWelcome>;
};

export default TIMELINE;
