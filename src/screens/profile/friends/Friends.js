import React, { useContext } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { HeaderText } from "../../home/StyledHome";

const FRIENDS = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  return <HeaderText theme={selectedTheme}>FRIENDS</HeaderText>;
};

export default FRIENDS;
