import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Row, Stat, StatSide } from "./StyledStats";
import { GameContext } from "../../contexts/GameContext";
import STATS_PLAYERS from "./StatsPlayers";

const DATA = [
  {
    name: "match average",
    data: "avgMatch",
    rounding: 1,
  },
  {
    name: "best leg - average",
    data: "bestAvgLeg",
    rounding: 1,
  },
  {
    name: "best leg - darts used",
    data: "bestLegByDartsUsed",
    rounding: 0,
  },
  {
    name: "highest checkout",
    data: "highestCheckout",

    rounding: 0,
  },
  {
    name: "checkout percentage",
    data: "doublePercentage",
    rounding: false,
  },
  {
    name: "100+",
    data: 100,
    rounding: 0,
  },
  {
    name: "140+",
    data: 140,
    rounding: 0,
  },

  {
    name: "180",
    data: 180,
    rounding: 0,
  },
];

const STATS2 = React.memo(() => {
  let { gameData } = useContext(GameContext);
  let { theme } = useContext(ThemeContext);
  const { p1_DATA, p2_DATA } = gameData;

  return (
    <>
      <STATS_PLAYERS theme={theme} gameData={gameData} />
      {DATA.map((item) => {
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
export default STATS2;
