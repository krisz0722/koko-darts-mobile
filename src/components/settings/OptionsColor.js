import React, { useContext, useState } from "react";
import { Row, Div } from "../../screens/settings/StyledSettings";
import SETTINGS_BUTTON from "../buttons/SettingsButton";
import SETTINGS_HEADER from "./SettingsHeader";
import { ThemeContext } from "../../contexts/ThemeContext";
import { InGameThemeContext } from "../../contexts/InGameThemeContext";
import styled from "styled-components";

const RowMod = styled(Row)`
  top: ${() => (100 / 5.5) * 1 + "%"};
`;

export const COLOR = React.memo((props) => {
  const { ingame, toggleColor } = props;
  const { theme, setSelectedTheme } = useContext(ThemeContext);

  const { inGameTheme, setInGameSelectedTheme } = useContext(
    InGameThemeContext,
  );

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
    <RowMod theme={theme} layout="asym">
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
    </RowMod>
  );
});
