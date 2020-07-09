import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import {
  Row,
  Div,
  Header,
  Button_Settings,
  Text_Button,
} from "../_styled/Styled_Settings";

export const LAYOUT = () => {
  const {
    settings: { layout, selectedTheme },
    dispatchSettings,
  } = useContext(SettingsContext);

  const DATA = ["classic", "asym"];

  const handlePress = (val) => {
    dispatchSettings({ type: "CHANGE_LAYOUT", value: val });
  };

  return (
    <Row theme={selectedTheme}>
      <Header theme={selectedTheme}>layout</Header>

      <Div theme={selectedTheme}>
        {DATA.map((item) => (
          <Button_Settings
            active={layout === item}
            length={DATA.length}
            key={`${item}input`}
            theme={selectedTheme}
            onPress={() => handlePress(item)}
          >
            <Text_Button active={layout === item} theme={selectedTheme}>
              {item}
            </Text_Button>
          </Button_Settings>
        ))}
      </Div>
    </Row>
  );
};
