import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import {
  ClassicStatsPlayer1,
  ClassicStatsPlayer2,
} from "../containers/ClassicPlayerStats";
import { GameContext } from "../../contexts/GameContext";
import PLAYER_STATS from "./ClassicPlayerStats";

const CLASSIC_STATS = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const theme = selectedTheme;

  const {
    gameData: { activePlayer, showStats },
  } = useContext(GameContext);

  return (
    <>
      <ClassicStatsPlayer1 player={"p1"} showStats={showStats} theme={theme}>
        <PLAYER_STATS player={"p1"} />
      </ClassicStatsPlayer1>
      <ClassicStatsPlayer2 player={"p2"} showStats={showStats} theme={theme}>
        <PLAYER_STATS player={"p2"} />
      </ClassicStatsPlayer2>
    </>
  );
};

export default CLASSIC_STATS;
