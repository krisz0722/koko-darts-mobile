import React, { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import { SettingsContext } from "../../contexts/SettingsContext";
import {
  Row,
  Div,
  Header,
  Button_Settings,
  Text_Button,
} from "../_styled/Styled_Settings";

export const GAMESETTINGS1 = () => {
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
      <Header theme={selectedTheme}>starting score</Header>
      <Div theme={selectedTheme}>
        {DATA.map((item) => (
          <Button_Settings
            active={score === item}
            length={DATA.length}
            key={`${item}input`}
            theme={selectedTheme}
            onPress={() => handlePress(item)}
            value={item}
          >
            <Text_Button active={score === item} theme={selectedTheme}>
              {item}
            </Text_Button>
          </Button_Settings>
        ))}
      </Div>
    </Row>
  );
};
