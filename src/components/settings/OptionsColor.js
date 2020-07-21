import React, { useContext } from "react";
import { Row, Div } from "../../screens/settings/StyledSettings";
import SETTINGS_BUTTON from "../buttons/SettingsButton";
import SETTINGS_HEADER from "./SettingsHeader";
import { ThemeContext } from "../../contexts/ThemeContext";

export const COLOR = () => {
  const { theme, setSelectedTheme } = useContext(ThemeContext);

  const DATA = ["default", "contrast"];

  const handlePress = (val) => {
    setSelectedTheme(val);
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
