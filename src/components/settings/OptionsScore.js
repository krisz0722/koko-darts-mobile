import React, { useEffect, useContext, useState } from "react";
import { Row, Div } from "../../screens/settings/StyledSettings";
import SETTINGS_HEADER from "./SettingsHeader";
import SETTINGS_BUTTON from "../buttons/SettingsButton";
import { ThemeContext } from "../../contexts/ThemeContext";
import styled from "styled-components";

const RowMod = styled(Row)`
  top: ${({ page }) => (page === "main" ? (100 / 5.5) * 3 + "%" : "30%")};
`;

export const OptionsScore = React.memo((props) => {
  const { startingScore, toggleStartingScore, page } = props;
  const { theme } = useContext(ThemeContext);

  const DATA = [301, 501, 701, 901];

  console.log("RENDER SCORE");

  return (
    <RowMod page={page} theme={theme}>
      <SETTINGS_HEADER text={"starting score"} />
      <Div theme={theme}>
        {DATA.map((item) => (
          <SETTINGS_BUTTON
            active={startingScore === item}
            length={DATA.length}
            key={item}
            action={() => toggleStartingScore(item)}
            value={item}
          />
        ))}
      </Div>
    </RowMod>
  );
});
