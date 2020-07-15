import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import { Row, Div } from "../../screens/settings/StyledSettings";
import SETTINGS_BUTTON from "./SettingsButton";
import SETTINGS_HEADER from "./SettingsHeader";

export const OptionsEffects = () => {
  const {
    settings: { selectedTheme, animation, opacity, blur },
    dispatchSettings,
  } = useContext(SettingsContext);

  const EFFECTS = [
    {
      name: "animations",
      prop: animation,
      handler: () =>
        dispatchSettings({ type: "TOGGLE_ANIMATION", value: !animation }),
    },
    {
      name: "opacity",
      prop: opacity,
      handler: () => dispatchSettings({ type: "OPACITY", value: !opacity }),
    },
    {
      name: "blur",
      prop: blur,
      handler: () => dispatchSettings({ type: "TOGGLE_BLUR", value: !blur }),
    },
  ];

  return (
    <Row theme={selectedTheme} layout="asym">
      <SETTINGS_HEADER
        text={"visual effects"}
        icon={"help-outline"}
        action={() => console.log("action")}
      />
      <Div theme={selectedTheme}>
        {EFFECTS.map((item) => (
          <SETTINGS_BUTTON
            value={item.name}
            active={item.prop}
            length={EFFECTS.length}
            action={item.handler}
            checkbox={true}
            size={"small"}
          />
        ))}
      </Div>
    </Row>
  );
};
