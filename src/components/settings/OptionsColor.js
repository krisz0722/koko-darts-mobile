import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import { Row, Div } from "../../screens/settings/StyledSettings";
import SETTINGS_BUTTON from "../buttons/SettingsButton";
import SETTINGS_HEADER from "./SettingsHeader";

export const COLOR = () => {
  const {
    settings: { selectedTheme },
    dispatchSettings,
  } = useContext(SettingsContext);
  const theme = selectedTheme;

  const DATA = ["default", "contrast"];

  const handlePress = (val) => {
    dispatchSettings({ type: "CHANGE_THEME", value: val });
  };

  return (
    <Row theme={theme} layout="asym">
      <SETTINGS_HEADER text={"theme"} action={() => alert("action")} />
      <Div theme={theme}>
        {DATA.map((item) => (
          <SETTINGS_BUTTON
            key={item}
            value={item}
            active={theme.name === item}
            length={DATA.length}
            action={() => handlePress(item)}
          />
        ))}
      </Div>
    </Row>
  );
};
