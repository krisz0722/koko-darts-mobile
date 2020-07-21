import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import { Row, Div } from "../../screens/settings/StyledSettings";
import SETTINGS_HEADER from "./SettingsHeader";
import SETTINGS_BUTTON from "../buttons/SettingsButton";
import { ThemeContext } from "../../contexts/ThemeContext";

export const OptionsScore = () => {
  const { theme } = useContext(ThemeContext);

  const {
    dispatchSettings,
    settings: { startingScore },
  } = useContext(SettingsContext);

  const DATA = [301, 501, 701, 901];

  const handlePress = (val) => {
    const value = parseInt(val);
    dispatchSettings({ type: "CHANGE_STARTINGSCORE", value });
  };

  return (
    <Row theme={theme} id="gamesettings1">
      <SETTINGS_HEADER text={"starting score"} />
      <Div theme={theme}>
        {DATA.map((item) => (
          <SETTINGS_BUTTON
            active={startingScore === item}
            length={DATA.length}
            key={item}
            action={() => handlePress(item)}
            value={item}
          />
        ))}
      </Div>
    </Row>
  );
};
