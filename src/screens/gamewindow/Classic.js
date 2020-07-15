import React from "react";
import CLASSIC_SCORES from "../../components/classic/Scores/ClassicScores";
import CLASSIC_MIDDLE from "../../components/classic/Middle/ClassicMiddle";
import CLASSIC_BOTTOM from "../../components/classic/Bottom/ClassicBottom";
import CLASSIC_TOP from "../../components/classic/Top/ClassicTop";
import CLASSIC_STATS from "../../components/classic/Stats/ClassicStats";

const GAME_CLASSIC = () => {
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
