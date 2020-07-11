import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import {
  ClassicBottom,
  ClassicMiddle,
  ClassicScores,
  ClassicTop,
} from "../containers/ClassicWindow";
import {
  ClassicPlayerScore,
  ClassicCurrentScores,
  ClassicPlayer1Score,
  ClassicPlayer2Score,
} from "../containers/ClassicPlayerScore";
import {
  ClassicCheckouts,
  ClassicCheckoutsP1,
  ClassicCheckoutsP2,
} from "../containers/ClassicPlayerCheckouts";
import {
  ClassicStatsPlayer1,
  ClassicStatsPlayer2,
} from "../containers/ClassicPlayerStats";
import { GameContext } from "../../contexts/GameContext";
import CLASSIC_NUM from "../NumButton";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import CLASSIC_FUNCTION from "../FunctionButton";
import PLAYER_STATS from "./ClassicPlayerStats";
import PLAYER_CHECKOUTS from "./ClassicCheckouts";

const CLASSIC_SCORES = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const theme = selectedTheme;

  const {
    gameData: { activePlayer, showStats, p1_DATA, p2_DATA },
  } = useContext(GameContext);

  return (
    <ClassicScores ap={activePlayer} theme={theme} showStats={showStats}>
      <ClassicCheckouts theme={theme}>
        <ClassicCheckoutsP1 ap={activePlayer} theme={theme}>
          <PLAYER_CHECKOUTS
            checkout={p1_DATA.onCheckout}
            theme={theme}
            player={"p1"}
          />
        </ClassicCheckoutsP1>
        <ClassicCheckoutsP2 ap={activePlayer} theme={theme}>
          <PLAYER_CHECKOUTS
            checkout={p2_DATA.onCheckout}
            theme={theme}
            player={"p2"}
          />
        </ClassicCheckoutsP2>
      </ClassicCheckouts>
      <ClassicCurrentScores
        ap={activePlayer}
        theme={theme}
        showStats={showStats}
      >
        <ClassicPlayer1Score
          checkout={p1_DATA.onCheckout}
          ap={activePlayer}
          theme={theme}
          player={"p1"}
        >
          {p1_DATA.score}
        </ClassicPlayer1Score>
        <ClassicPlayer2Score
          checkout={p2_DATA.onCheckout}
          ap={activePlayer}
          theme={theme}
          player={"p2"}
        >
          {p2_DATA.score}
        </ClassicPlayer2Score>
      </ClassicCurrentScores>
    </ClassicScores>
  );
};

export default CLASSIC_SCORES;
