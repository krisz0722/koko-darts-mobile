import React, { useContext } from "react";
import { Row, Div } from "./StyledSettings";
import SETTINGS_BUTTON from "../../components/buttons/SettingsButton";
import SETTINGS_HEADER from "./Header";
import { ThemeContext } from "../../contexts/ThemeContext";

export const OptionsEffects = React.memo((props) => {
  const { animation, toggleAnimation, opacity, toggleOpacity } = props;

  const { theme, background, setBackground } = useContext(ThemeContext);

  console.log("RENDER EFFECT");

  return (
    <Row theme={theme} layout="asym">
      <SETTINGS_HEADER
        text={"visual effects"}
        icon={"help-outline"}
        action={() => alert("action")}
      />
      <Div theme={theme}>
        <SETTINGS_BUTTON
          value={"animation"}
          active={animation}
          length={3}
          size={"small"}
          action={toggleAnimation}
          checkbox={true}
        />
        <SETTINGS_BUTTON
          value={"background"}
          active={background}
          length={3}
          size={"small"}
          action={() => setBackground(!background)}
          checkbox={true}
        />
        <SETTINGS_BUTTON
          value={"opacity"}
          size={"small"}
          active={opacity}
          length={3}
          action={toggleOpacity}
          checkbox={true}
        />
      </Div>
    </Row>
  );
});

//TODO async?
