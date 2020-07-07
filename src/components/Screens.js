import React, { useContext } from "react";
import { ScreenContainer } from "./Styled_ScreenContainer";
import { REGISTER } from "./screens/ScreenRegister";
import { SettingsContext } from "../contexts/SettingsContext";

const SCREENS = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);
  return (
    <ScreenContainer theme={selectedTheme}>
      <REGISTER />
    </ScreenContainer>
  );
};

export default SCREENS;
