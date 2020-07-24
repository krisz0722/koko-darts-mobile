import React, { useContext, useState } from "react";
import { Row, Div } from "../../screens/settings/StyledSettings";
import SETTINGS_BUTTON from "../buttons/SettingsButton";
import SETTINGS_HEADER from "./SettingsHeader";
import { ThemeContext } from "../../contexts/ThemeContext";
import styled from "styled-components";

const RowMod = styled(Row)`
  top: ${() => (100 / 5.5) * 2 + "%"};
`;

export const OptionsEffects = React.memo((props) => {
  const { animation, toggleAnimation, opacity, toggleOpacity } = props;

  const { theme } = useContext(ThemeContext);

  console.log("RENDER EFFECT");

  return (
    <RowMod theme={theme} layout="asym">
      <SETTINGS_HEADER
        text={"visual effects"}
        icon={"help-outline"}
        action={() => alert("action")}
      />
      <Div theme={theme}>
        <SETTINGS_BUTTON
          value={"animation"}
          active={animation}
          length={2}
          action={toggleAnimation}
          checkbox={true}
        />
        <SETTINGS_BUTTON
          value={"opacity"}
          active={opacity}
          length={2}
          action={toggleOpacity}
          checkbox={true}
        />
      </Div>
    </RowMod>
  );
});

//TODO async?
