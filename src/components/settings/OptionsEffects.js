import React, { useContext } from "react";
import { Row, Div } from "../../screens/settings/StyledSettings";
import SETTINGS_BUTTON from "../buttons/SettingsButton";
import SETTINGS_HEADER from "./SettingsHeader";
import { ThemeContext } from "../../contexts/ThemeContext";
import { InGameThemeContext } from "../../contexts/InGameThemeContext";
import { OpacityContext } from "../../contexts/OpacityContext";
import { InGameOpacityContext } from "../../contexts/InGameOpacityContext";

export const OptionsEffects = ({ ingame }) => {
  const { theme, animation, setAnimation } = useContext(ThemeContext);
  const { inGameTheme, inGameAnimation, setInGameAnimation } = useContext(
    InGameThemeContext,
  );
  const { opacity, setOpacity } = useContext(OpacityContext);
  const { inGameOpacity, setInGameOpacity } = useContext(InGameOpacityContext);

  const animationToUse = ingame ? inGameAnimation : animation;
  const themeToUse = ingame ? inGameTheme : theme;
  const opacityToUse = ingame ? inGameOpacity : opacity;

  console.log(opacity);
  console.log(inGameOpacity);

  const toggleAnimation = () => {
    if (ingame) {
      setInGameAnimation(!inGameAnimation);
    } else {
      setAnimation(!animation);
    }
  };

  const toggleOpacity = () => {
    if (ingame) {
      setInGameOpacity(!inGameOpacity);
    } else {
      setOpacity(!opacity);
    }
  };

  return (
    <Row theme={themeToUse} layout="asym">
      <SETTINGS_HEADER
        text={"visual effects"}
        icon={"help-outline"}
        action={() => alert("action")}
      />
      <Div theme={themeToUse}>
        <SETTINGS_BUTTON
          value={"animation"}
          active={animationToUse}
          length={2}
          action={toggleAnimation}
          checkbox={true}
        />
        <SETTINGS_BUTTON
          value={"opacity"}
          active={opacityToUse}
          length={2}
          action={toggleOpacity}
          checkbox={true}
        />
      </Div>
    </Row>
  );
};

//TODO async?
