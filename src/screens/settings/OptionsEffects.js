import React, { useContext } from "react";
import { Row, Div } from "./StyledSettings";
import SETTINGS_BUTTON from "../../components/buttons/SettingsButton";
import SETTINGS_HEADER from "./Header";
import { ThemeContext } from "../../contexts/ThemeContext";
import { GameContext } from "../../contexts/GameContext";

export const OptionsEffects = React.memo((props) => {
  const {
    ingame,
    animation,
    background,
    toggleBackground,
    toggleAnimation,
    opacity,
    toggleOpacity,
  } = props;

  const { theme } = useContext(ThemeContext);

  const {
    gameData: { settings },
  } = useContext(GameContext);

  const themeToUse = ingame ? settings.theme : theme;

  return (
    <Row theme={themeToUse} layout="asym">
      <SETTINGS_HEADER
        text={"visual effects"}
        icon={"help-outline"}
        action={() => alert("action")}
        inGameTheme={themeToUse}
      />
      <Div theme={theme}>
        <SETTINGS_BUTTON
          value={"animation"}
          active={animation}
          length={3}
          size={"small"}
          action={toggleAnimation}
          checkbox={true}
          inGameTheme={themeToUse}
        />
        <SETTINGS_BUTTON
          value={"background"}
          active={background}
          length={3}
          size={"small"}
          action={toggleBackground}
          checkbox={true}
          inGameTheme={themeToUse}
        />
        <SETTINGS_BUTTON
          value={"opacity"}
          size={"small"}
          active={opacity}
          length={3}
          action={toggleOpacity}
          checkbox={true}
          inGameTheme={themeToUse}
        />
      </Div>
    </Row>
  );
});

//TODO async?
