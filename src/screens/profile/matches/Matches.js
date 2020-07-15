import React, { useContext } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { HeaderWelcome } from "../../home/StyledHome";

const MATCHES = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  return <HeaderWelcome theme={selectedTheme}>MATCHES</HeaderWelcome>;
};

export default MATCHES;
