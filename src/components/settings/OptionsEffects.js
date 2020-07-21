import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import { Row, Div } from "../../screens/settings/StyledSettings";
import SETTINGS_BUTTON from "../buttons/SettingsButton";
import SETTINGS_HEADER from "./SettingsHeader";
import { ThemeContext } from "../../contexts/ThemeContext";
import { GameContext } from "../../contexts/GameContext";

export const OptionsEffects = () => {
  const { theme, animation, setAnimation } = useContext(ThemeContext);
  const {
    dispatchGameData,
    gameData: { opacity },
  } = useContext(GameContext);

  const toggleAnimation = () => setAnimation(!animation);
  const toggleOpacity = () =>
    dispatchGameData({ type: "OPACITY", value: !opacity });

  return (
    <Row theme={theme} layout="asym">
      <SETTINGS_HEADER
        text={"visual effects"}
        icon={"help-outline"}
        action={() => alert("action")}
      />
      <Div theme={theme}>
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
