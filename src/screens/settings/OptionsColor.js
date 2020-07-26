import React, { useContext } from "react";
import { Row, Div } from "./StyledSettings";
import SETTINGS_BUTTON from "../../components/buttons/SettingsButton";
import SETTINGS_HEADER from "./Header";
import { ThemeContext } from "../../contexts/ThemeContext";

export const COLOR = React.memo(() => {
  const { theme, setSelectedTheme } = useContext(ThemeContext);

  const DATA = ["default", "contrast"];

  console.log("RENDER COLOR");

  return (
    <Row theme={theme} layout="asym">
      <SETTINGS_HEADER text={"theme"} action={() => alert("action")} />
      <Div theme={theme}>
        {DATA.map((item) => (
          <SETTINGS_BUTTON
            key={item}
            value={item}
            active={theme.name === item}
            length={DATA.length}
            action={() => setSelectedTheme(item)}
          />
        ))}
      </Div>
    </Row>
  );
});
