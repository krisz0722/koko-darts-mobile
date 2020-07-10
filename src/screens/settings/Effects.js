import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import {
  Text_Button,
  Row,
  Div,
  Header,
  Button_Settings,
  Div2,
} from "../_styled/Styled_Settings";
import { Checkbox } from "react-native-paper";

export const EFFECTS = () => {
  const {
    settings: { selectedTheme, animation, blur },
    dispatchSettings,
  } = useContext(SettingsContext);

  const toggleAnimation = () =>
    dispatchSettings({ type: "TOGGLE_ANIMATION", value: !animation });
  const toggleBlur = () => {
    dispatchSettings({ type: "TOGGLE_BLUR", value: !blur });
  };

  return (
    <Row theme={selectedTheme} layout="asym">
      <Header theme={selectedTheme}>visual effects</Header>
      <Div theme={selectedTheme}>
        <Button_Settings
          active={animation}
          length={3}
          onPress={toggleAnimation}
          theme={selectedTheme}
          underlayColor={selectedTheme.bg2}
          activeOpacity={1}
        >
          <Div2>
            <Checkbox
              uncheckedColor={selectedTheme.borderColor}
              color={animation ? selectedTheme.bg1 : "transparent"}
              status={animation ? "checked" : "unchecked"}
            />
            <Text_Button active={animation} theme={selectedTheme}>
              {"animations"}
            </Text_Button>
          </Div2>
        </Button_Settings>
        <Button_Settings
          active={animation}
          length={3}
          onPress={toggleAnimation}
          theme={selectedTheme}
          underlayColor={selectedTheme.bg2}
          activeOpacity={1}
        >
          <Div2>
            <Checkbox
              uncheckedColor={selectedTheme.borderColor}
              color={animation ? selectedTheme.bg1 : "transparent"}
              status={animation ? "checked" : "unchecked"}
            />
            <Text_Button active={animation} theme={selectedTheme}>
              {"inactive opacity"}
            </Text_Button>
          </Div2>
        </Button_Settings>

        <Button_Settings
          active={animation}
          length={3}
          onPress={toggleAnimation}
          theme={selectedTheme}
          underlayColor={selectedTheme.bg2}
          activeOpacity={1}
        >
          <Div2>
            <Checkbox
              uncheckedColor={selectedTheme.borderColor}
              color={animation ? selectedTheme.bg1 : "transparent"}
              status={animation ? "checked" : "unchecked"}
            />
            <Text_Button active={animation} theme={selectedTheme}>
              {"inactive blur"}
            </Text_Button>
          </Div2>
        </Button_Settings>
      </Div>
    </Row>
  );
};
