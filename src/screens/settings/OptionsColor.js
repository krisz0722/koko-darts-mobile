import React, { useContext } from "react";
import { Row, Div } from "./home/StyledSettings";
import SETTINGS_BUTTON from "../../components/buttons/SettingsButton";
import SETTINGS_HEADER from "./Header";
import { ThemeContext } from "../../contexts/ThemeContext";
import { GameContext } from "../../contexts/GameContext";

export const COLOR = React.memo(({ toggleTheme, ingame = false }) => {
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
          <SETTINGS_BUTTON
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
