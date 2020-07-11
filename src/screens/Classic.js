import React, { useContext } from "react";
import { ClassicTop } from "../components/containers/ClassicWindow";
import { GameContext } from "../contexts/GameContext";
import CLASSIC_SCORES from "../components/classic/ClassicScores";
import CLASSIC_STATS from "../components/classic/ClassicStats";
import CLASSIC_MIDDLE from "../components/classic/ClassicMiddle";
import CLASSIC_BOTTOM from "../components/classic/ClassicBottom";
import CLASSIC_TOP from "../components/classic/ClassicTop";
import { SettingsContext } from "../contexts/SettingsContext";

const GAME_CLASSIC = () => {
  const {
    gameData: { showStats, activePlayer },
  } = useContext(GameContext);
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const theme = selectedTheme;
  return (
    <>
      <CLASSIC_TOP />
      <CLASSIC_SCORES />
      <CLASSIC_STATS />
      <CLASSIC_MIDDLE />
      <CLASSIC_BOTTOM />
    </>
  );
};

export default GAME_CLASSIC;
