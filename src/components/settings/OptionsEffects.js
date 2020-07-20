import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import { Row, Div } from "../../screens/settings/StyledSettings";
import SETTINGS_BUTTON from "../buttons/SettingsButton";
import SETTINGS_HEADER from "./SettingsHeader";

export const OptionsEffects = () => {
  const {
    settings: { selectedTheme, animation, opacity },
    dispatchSettings,
  } = useContext(SettingsContext);

  const toggleAnimation = () =>
    dispatchSettings({ type: "TOGGLE_ANIMATION", value: !animation });
  const toggleOpacity = () =>
    dispatchSettings({ type: "OPACITY", value: !opacity });

  return (
    <Row theme={selectedTheme} layout="asym">
      <SETTINGS_HEADER
        text={"visual effects"}
        icon={"help-outline"}
        action={() => alert("action")}
      />
      <Div theme={selectedTheme}>
        <SETTINGS_BUTTON
          value={"animation"}
          active={animation}
          length={2}
          action={toggleAnimation}
          checkbox={true}
        />
        <SETTINGS_BUTTON
          value={"opacity"}
          active={opacity}
          length={2}
          action={toggleOpacity}
          checkbox={true}
        />
      </Div>
    </Row>
  );
};
