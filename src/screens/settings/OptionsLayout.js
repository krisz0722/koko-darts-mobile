import React, { useContext } from "react";
import { Row, Div } from "./home/StyledOptions";
import SETTINGS_HEADER from "./SettingsHeader";
import OPTION_BUTTON from "../../components/buttons/OptionButton";
import { ThemeContext } from "../../contexts/ThemeContext";
import { GameContext } from "../../contexts/GameContext";

const OPTIONS_LAYOUT = React.memo((props) => {
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
        {DATA.map((item, i) => (
          <OPTION_BUTTON
            key={i}
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

export default OPTIONS_LAYOUT;
