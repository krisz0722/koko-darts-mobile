import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import { Row, Div } from "../../screens/settings/StyledSettings";
import SETTINGS_HEADER from "./SettingsHeader";
import SETTINGS_BUTTON from "../buttons/SettingsButton";
import { ThemeContext } from "../../contexts/ThemeContext";

export const OptionsLayout = () => {
  const {
    settings: { layout },
    dispatchSettings,
  } = useContext(SettingsContext);
  const { theme } = useContext(ThemeContext);

  const DATA = ["classic", "asym"];

  const handlePress = (val) => {
    dispatchSettings({ type: "CHANGE_LAYOUT", value: val });
  };

  return (
    <Row theme={theme}>
      <SETTINGS_HEADER text={"layout"} />

      <Div theme={theme}>
        {DATA.map((item) => (
          <SETTINGS_BUTTON
            key={item}
            value={item}
            active={layout === item}
            length={DATA.length}
            action={() => handlePress(item)}
          />
        ))}
      </Div>
    </Row>
  );
};
