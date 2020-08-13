import React, { useContext } from "react";
import { Row, Div } from "./StyledSettings";
import SETTINGS_HEADER from "./Header";
import SETTINGS_BUTTON from "../../components/buttons/SettingsButton";
import { ThemeContext } from "../../contexts/ThemeContext";

export const OptionsScore = React.memo((props) => {
  const { startingScore, toggleStartingScore, page } = props;
  const { theme } = useContext(ThemeContext);

  const DATA = [301, 501, 701, 901];

  return (
    <Row page={page} theme={theme}>
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
    </Row>
  );
});
