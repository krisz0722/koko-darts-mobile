import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import DATA_STATS from "./DataStats";
import {
  Averages,
  ClassicStatsPlayer1,
  ClassicStatsPlayer2,
  StatRow,
  StatText1,
  StatText2,
  StatText3,
  StatText4,
  Totals,
} from "./StyedStats";

const CLASSIC_STATS = React.memo((props) => {
  const { activePlayer, showStats, animation, theme, p1_DATA, p2_DATA } = props;

  const animationValue = useRef(
    new Animated.Value(activePlayer === "p1" ? 1 : 0),
  ).current;
  const drawerAnimation = useRef(new Animated.Value(showStats ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: activePlayer === "p1" ? 1 : 0,
      duration: 300,
    }).start();
  }, [animationValue, activePlayer]);

  useEffect(() => {
    Animated.timing(drawerAnimation, {
      toValue: showStats ? 1 : 0,
      duration: 300,
    }).start();
  }, [drawerAnimation, showStats]);

  const borderColor = animation
    ? animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.game.p2Border, theme.game.p1Border],
      })
    : theme.game[activePlayer + "Border"];

  const top = animation
    ? drawerAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ["45%", "35%"],
      })
    : showStats
    ? "35%"
    : "45%";

  const sixtyPlus = (player) =>
    player === "p1"
      ? p1_DATA["60"] + p1_DATA["80"]
      : p2_DATA["60"] + p2_DATA["80"];

  return (
    <>
      <ClassicStatsPlayer1
        style={{ top }}
        ap={activePlayer}
        player={"p1"}
        theme={theme}
        showStats={showStats}
      >
        <Averages
          style={{ borderColor }}
          ap={activePlayer}
          player={"p1"}
          theme={theme}
        >
          {DATA_STATS().averages.map((item, i) => (
            <StatRow key={i}>
              <StatText1 player={"p1"} theme={theme}>
                {item.name + " average"}
              </StatText1>
              <StatText2 player={"p1"} theme={theme}>
                {p1_DATA[item.value].toFixed(1)}
              </StatText2>
            </StatRow>
          ))}
        </Averages>
        <Totals
          style={{ borderColor }}
          ap={activePlayer}
          player={"p1"}
          theme={theme}
        >
          {DATA_STATS().totals.map((item, i) => (
            <StatRow key={i}>
              <StatText3 player={"p1"} theme={theme}>
                {item.name}
              </StatText3>
              <StatText4 player={"p1"} theme={theme}>
                {item.name === "60+" ? sixtyPlus("p1") : p1_DATA[item.value]}
              </StatText4>
            </StatRow>
          ))}
        </Totals>
      </ClassicStatsPlayer1>
      <ClassicStatsPlayer2
        style={{ top }}
        showStats={showStats}
        ap={activePlayer}
        player={"p2"}
        theme={theme}
      >
        <Averages
          style={{ borderColor }}
          ap={activePlayer}
          player={"p2"}
          theme={theme}
        >
          {DATA_STATS().averages.map((item, i) => (
            <StatRow key={i}>
              <StatText1 player={"p2"} theme={theme}>
                {item.name + " average"}
              </StatText1>
              <StatText2 player={"p2"} theme={theme}>
                {p2_DATA[item.value].toFixed(1)}
              </StatText2>
            </StatRow>
          ))}
        </Averages>
        <Totals
          style={{ borderColor }}
          ap={activePlayer}
          player={"p2"}
          theme={theme}
        >
          {DATA_STATS().totals.map((item, i) => (
            <StatRow key={i}>
              <StatText3 player={"p2"} theme={theme}>
                {item.name}
              </StatText3>
              <StatText4 player={"p2"} theme={theme}>
                {item.name === "60+" ? sixtyPlus("p2") : p2_DATA[item.value]}
              </StatText4>
            </StatRow>
          ))}
        </Totals>
      </ClassicStatsPlayer2>
    </>
  );
});

export default CLASSIC_STATS;
