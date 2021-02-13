import React, { useContext } from "react";
import { Row, Stat, StatSide } from "../endgame/StyledEndGame";
import { GameContext } from "../../contexts/GameContext";
import ENDGAME_PLAYER from "../endgame/EndGamePlayers";
import STATS_DATA2 from "./StatsDataModel2";

const STATS_FINISH_MATCH = React.memo(() => {
  let {
    gameData,
    gameData: {
      settings: { theme },
    },
  } = useContext(GameContext);
  const { p1_DATA, p2_DATA } = gameData;

  return (
    <>
      <ENDGAME_PLAYER bottom={true} theme={theme} gameData={gameData} />
      {STATS_DATA2.map((item) => {
        const p1 = item.rounding
          ? p1_DATA[item.data].toFixed(item.rounding)
          : p1_DATA[item.data];
        const p2 = item.rounding
          ? p2_DATA[item.data].toFixed(item.rounding)
          : p2_DATA[item.data];
        return (
          <Row>
            <StatSide theme={theme}>{p1}</StatSide>
            <Stat theme={theme}>{item.name}</Stat>
            <StatSide theme={theme}>{p2}</StatSide>
          </Row>
        );
      })}
    </>
  );
});
export default STATS_FINISH_MATCH;
