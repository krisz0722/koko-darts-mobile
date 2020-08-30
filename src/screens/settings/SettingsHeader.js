import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { SettingsHeaderContainer } from "./home/StyledSettings";
import { Header2 } from "../../components/headers/StyledHeaders";

const SETTINGS_HEADER = ({ inGameTheme, text, header = false }) => {
  const { theme } = useContext(ThemeContext);

  const themeToUse = inGameTheme ? inGameTheme : theme;

  return (
    <SettingsHeaderContainer header={header}>
      <Header2 theme={themeToUse}>{text}</Header2>
    </SettingsHeaderContainer>
  );
};

export default SETTINGS_HEADER;
