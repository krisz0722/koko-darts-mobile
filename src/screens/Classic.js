import React, { useContext, useEffect } from "react";
import { GameContext } from "../contexts/GameContext";
import CLASSIC_SCORES from "../components/classic/Scores/ClassicScores";
import CLASSIC_STATS from "../components/classic/Stats/ClassicStats";
import CLASSIC_MIDDLE from "../components/classic/Middle/ClassicMiddle";
import CLASSIC_BOTTOM from "../components/classic/Bottom/ClassicBottom";
import CLASSIC_TOP from "../components/classic/Top/ClassicTop";
import { SettingsContext } from "../contexts/SettingsContext";
import { NavigationContext } from "../contexts/NavigationContext";

const GAME_CLASSIC = () => {
  const {
    gameData: { showStats, activePlayer },
  } = useContext(GameContext);
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);
  const { showTab, setShowTab } = useContext(NavigationContext);

  useEffect(() => {
    setShowTab(false);
  });

  console.log(showTab);

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
