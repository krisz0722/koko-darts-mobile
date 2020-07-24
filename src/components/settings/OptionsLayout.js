import React, { useEffect, useContext, useState } from "react";
import { Row, Div } from "../../screens/settings/StyledSettings";
import SETTINGS_HEADER from "./SettingsHeader";
import SETTINGS_BUTTON from "../buttons/SettingsButton";
import { ThemeContext } from "../../contexts/ThemeContext";
import styled from "styled-components";

const RowMod = styled(Row)`
  top: 0;
`;

export const OptionsLayout = React.memo((props) => {
  const { layout, toggleLayout } = props;

  const { theme } = useContext(ThemeContext);

  const DATA = ["classic", "asym"];

  console.log("RENDER LAYOUT");

  return (
    <RowMod theme={theme}>
      <SETTINGS_HEADER text={"layout"} />

      <Div theme={theme}>
        {DATA.map((item) => (
          <SETTINGS_BUTTON
            key={item}
            value={item}
            active={layout === item}
            length={DATA.length}
            action={() => toggleLayout(item)}
          />
        ))}
      </Div>
    </RowMod>
  );
});
