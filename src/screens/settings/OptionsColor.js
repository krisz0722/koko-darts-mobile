import React, { useContext } from "react";
import { Row, Div } from "./StyledSettings";
import SETTINGS_BUTTON from "../../components/buttons/SettingsButton";
import SETTINGS_HEADER from "./Header";
import { ThemeContext } from "../../contexts/ThemeContext";
import { InGameThemeContext } from "../../contexts/InGameThemeContext";

export const COLOR = React.memo((props) => {
  const { ingame } = props;
  const { theme, setSelectedTheme } = useContext(ThemeContext);

  const { setInGameSelectedTheme } = useContext(InGameThemeContext);

  const DATA = ["default", "contrast"];

  // const themeToUse = ingame ? inGameTheme : theme;

  const handlePress = (val) => {
    if (ingame) {
      setInGameSelectedTheme(val);
    } else {
      setSelectedTheme(val);
    }
  };

  console.log("RENDER COLOR");

  return (
    <Row theme={theme} layout="asym">
      <SETTINGS_HEADER text={"theme"} action={() => alert("action")} />
      <Div theme={theme}>
        {DATA.map((item) => (
          <SETTINGS_BUTTON
            theme={theme}
            key={item}
            value={item}
            active={theme.name === item}
            length={DATA.length}
            action={() => handlePress(item)}
          />
        ))}
      </Div>
    </Row>
  );
});
