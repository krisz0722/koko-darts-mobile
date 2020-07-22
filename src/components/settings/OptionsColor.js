import React, { useContext } from "react";
import { Row, Div } from "../../screens/settings/StyledSettings";
import SETTINGS_BUTTON from "../buttons/SettingsButton";
import SETTINGS_HEADER from "./SettingsHeader";
import { ThemeContext } from "../../contexts/ThemeContext";
import { InGameThemeContext } from "../../contexts/InGameThemeContext";

export const COLOR = ({ ingame }) => {
  const { theme, setSelectedTheme } = useContext(ThemeContext);
  const { inGameTheme, setInGameSelectedTheme } = useContext(
    InGameThemeContext,
  );

  const DATA = ["default", "contrast"];

  const themeToUse = ingame ? inGameTheme : theme;

  const handlePress = (val) => {
    if (ingame) {
      setInGameSelectedTheme(val);
    } else {
      setSelectedTheme(val);
    }
  };

  return (
    <Row theme={themeToUse} layout="asym">
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
