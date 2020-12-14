import React, { useContext } from "react";
import { Row, Div } from "./home/StyledOptions";
import SETTINGS_HEADER from "./SettingsHeader";
import OPTION_BUTTON from "../../components/buttons/OptionButton";
import { ThemeContext } from "../../contexts/ThemeContext";

const OPTIONS_SCORE = React.memo((props) => {
  const { startingScore, toggleStartingScore, page } = props;
  const { theme } = useContext(ThemeContext);

  const DATA = [301, 501, 701, 901];

  return (
    <Row page={page} theme={theme}>
      <SETTINGS_HEADER text={"starting score"} />
      <Div theme={theme}>
        {DATA.map((item, i) => (
          <OPTION_BUTTON
            active={startingScore === item}
            length={DATA.length}
            key={i}
            action={() => toggleStartingScore(item)}
            value={item}
          />
        ))}
      </Div>
    </Row>
  );
});

export default OPTIONS_SCORE;
