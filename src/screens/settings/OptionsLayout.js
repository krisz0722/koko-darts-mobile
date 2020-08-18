import React, { useContext } from "react";
import { Row, Div } from "./StyledSettings";
import SETTINGS_HEADER from "./Header";
import SETTINGS_BUTTON from "../../components/buttons/SettingsButton";
import { ThemeContext } from "../../contexts/ThemeContext";
import { GameContext } from "../../contexts/GameContext";

export const OptionsLayout = React.memo((props) => {
  const { layout, toggleLayout, ingame } = props;
  const { theme } = useContext(ThemeContext);
  const {
    gameData: { settings },
  } = useContext(GameContext);

  const themeToUse = ingame ? settings.theme : theme;

  const DATA = ["classic", "asym"];

  return (
    <Row theme={themeToUse}>
      <SETTINGS_HEADER inGameTheme={themeToUse} text={"layout"} />

      <Div theme={themeToUse}>
        {DATA.map((item) => (
          <SETTINGS_BUTTON
            key={item}
            value={item}
            active={layout === item}
            length={DATA.length}
            action={() => toggleLayout(item)}
            inGameTheme={themeToUse}
          />
        ))}
      </Div>
    </Row>
  );
});
