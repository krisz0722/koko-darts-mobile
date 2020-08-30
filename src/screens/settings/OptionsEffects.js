import React, { useContext } from "react";
import { Row, Div } from "./home/StyledOptions";
import OPTION_BUTTON from "../../components/buttons/OptionButton";
import SETTINGS_HEADER from "./SettingsHeader";
import { ThemeContext } from "../../contexts/ThemeContext";
import { GameContext } from "../../contexts/GameContext";

const OPTIONS_EFFECT = React.memo((props) => {
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
  const length = ingame ? 2 : 3;

  return (
    <Row theme={themeToUse} layout="asym">
      <SETTINGS_HEADER
        text={"visual effects"}
        action={() => alert("action")}
        inGameTheme={themeToUse}
      />
      <Div theme={theme}>
        <OPTION_BUTTON
          value={"animation"}
          active={animation}
          length={length}
          size={"small"}
          action={toggleAnimation}
          checkbox={true}
          inGameTheme={themeToUse}
        />
        {!ingame ? (
          <OPTION_BUTTON
            value={"background"}
            active={background}
            length={3}
            size={"small"}
            action={toggleBackground}
            checkbox={true}
            inGameTheme={themeToUse}
          />
        ) : null}

        <OPTION_BUTTON
          value={"opacity"}
          size={"small"}
          active={opacity}
          length={length}
          action={toggleOpacity}
          checkbox={true}
          inGameTheme={themeToUse}
        />
      </Div>
    </Row>
  );
});

export default OPTIONS_EFFECT;
