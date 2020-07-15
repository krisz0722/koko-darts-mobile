import React, { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import { SettingsContext } from "../../contexts/SettingsContext";
import { Row, Div } from "../../screens/settings/StyledSettings";
import SETTINGS_HEADER from "./SettingsHeader";
import SETTINGS_BUTTON from "./SettingsButton";

export const OptionsScore = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);
  const {
    gameData: {
      p1_DATA: { score },
    },
    dispatchGameData,
  } = useContext(GameContext);

  const DATA = [301, 501, 701, 901];

  const handlePress = (val) => {
    const value = parseInt(val);
    dispatchGameData({ type: "CHANGE_STARTINGSCORE", value });
  };

  return (
    <Row theme={selectedTheme} id="gamesettings1">
      <SETTINGS_HEADER text={"starting score"} />
      <Div theme={selectedTheme}>
        {DATA.map((item) => (
          <SETTINGS_BUTTON
            active={score === item}
            length={DATA.length}
            key={`${item}input`}
            action={() => handlePress(item)}
            value={item}
          />
        ))}
      </Div>
    </Row>
  );
};
