import React, { useContext } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { HeaderText } from "../../home/StyledHome";

const TIMELINE = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  return <HeaderText theme={selectedTheme}>TIMELINE</HeaderText>;
};

export default TIMELINE;
