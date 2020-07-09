import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import {
  Row,
  Div,
  Header,
  Button_Settings,
  Text_Button,
} from "../_styled/Styled_Settings";

export const COLOR = () => {
  const {
    settings: { selectedTheme },
    dispatchSettings,
  } = useContext(SettingsContext);
  const themeName = selectedTheme.name;

  const DATA = ["default", "contrast"];

  const handlePress = (val) => {
    dispatchSettings({ type: "CHANGE_THEME", value: val });
  };

  return (
    <Row theme={selectedTheme} layout="asym">
      <Header theme={selectedTheme}>theme</Header>
      <Div theme={selectedTheme}>
        {DATA.map((item) => (
          <Button_Settings
            active={selectedTheme.name === item}
            length={DATA.length}
            onPress={() => handlePress(item)}
            theme={selectedTheme}
          >
            <Text_Button
              active={selectedTheme.name === item}
              theme={selectedTheme}
            >
              {item}
            </Text_Button>
          </Button_Settings>
        ))}
      </Div>
    </Row>
  );
};
