import React, { useContext } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { HeaderWelcome } from "../../home/StyledHome";

const FRIENDS = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  return <HeaderWelcome theme={selectedTheme}>FRIENDS</HeaderWelcome>;
};

export default FRIENDS;
