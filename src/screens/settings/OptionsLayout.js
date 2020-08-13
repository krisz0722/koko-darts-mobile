import React, { useContext } from "react";
import { Row, Div } from "./StyledSettings";
import SETTINGS_HEADER from "./Header";
import SETTINGS_BUTTON from "../../components/buttons/SettingsButton";
import { ThemeContext } from "../../contexts/ThemeContext";

export const OptionsLayout = React.memo((props) => {
  const { layout, toggleLayout } = props;

  const { theme } = useContext(ThemeContext);

  const DATA = ["classic", "asym"];

  return (
    <Row theme={theme}>
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
    </Row>
  );
});
