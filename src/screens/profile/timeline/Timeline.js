import React, { useContext } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { HeaderWelcome } from "../../home/StyledHome";

const TIMELINE = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  return <HeaderWelcome theme={selectedTheme}>TIMELINE</HeaderWelcome>;
};

export default TIMELINE;
