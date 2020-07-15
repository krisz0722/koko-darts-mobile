import React, { useContext } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { HeaderText } from "../../home/StyledHome";

const MATCHES = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  return <HeaderText theme={selectedTheme}>MATCHES</HeaderText>;
};

export default MATCHES;
