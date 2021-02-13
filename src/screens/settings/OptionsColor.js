import React, { useContext } from "react";
import { Row, Div } from "./home/StyledOptions";
import OPTION_BUTTON from "../../components/buttons/OptionButton";
import SETTINGS_HEADER from "./SettingsHeader";
import { ThemeContext } from "../../contexts/ThemeContext";
import { GameContext } from "../../contexts/GameContext";

const OPTIONS_COLOR = React.memo(({ toggleTheme, ingame = false }) => {
  const { theme } = useContext(ThemeContext);
  const {
    gameData: { settings },
  } = useContext(GameContext);

  const themeToUse = ingame ? settings.theme : theme;

  const DATA = ["default", "contrast"];

  return (
    <Row theme={themeToUse}>
      <SETTINGS_HEADER
        inGameTheme={themeToUse}
        text={"theme"}
        action={() => alert("action")}
      />
      <Div theme={themeToUse}>
        {DATA.map((item) => (
          <OPTION_BUTTON
            key={item}
            value={item}
            active={themeToUse.name === item}
            length={DATA.length}
            action={() => toggleTheme(item)}
            inGameTheme={themeToUse}
          />
        ))}
      </Div>
    </Row>
  );
});

export default OPTIONS_COLOR;
