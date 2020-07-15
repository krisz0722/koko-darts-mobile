import React, { useContext, useEffect, useRef } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { GameContext } from "../../../contexts/GameContext";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { Animated, Text, View } from "react-native";
import {
  FlexColAround,
  FlexRow,
  FlexRowBetween,
} from "../../../styles/css_mixins";
import createAnimation from "../../../styles/playerSwitchTransition";

export const ClassicStats = styled(Animated.View)`
  ${FlexRow};
  width: 50%;
  position: absolute;
  height: 10%;
  top: ${({ showStats }) => (showStats ? "35%" : "45%")};
  background-color: ${({ theme, player }) => theme.game[player + "Bg"]};
`;

export const ClassicStatsPlayer1 = styled(ClassicStats)`
  left: 0;
`;

export const ClassicStatsPlayer2 = styled(ClassicStats)`
  right: 0;
  background-color: ${({ theme }) => theme.game.p2Bg};
`;

export const Averages = styled(Animated.View)`
  width: 70%;
  height: 100%;
  ${FlexColAround};
  border-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme, ap }) => theme.game[ap + "Border"]};
`;

export const Totals = styled(Animated.View)`
  width: 30%;
  height: 100%;
  ${FlexColAround};
  border-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme, ap }) => theme.game[ap + "Border"]};
`;

export const StatRow = styled(View)`
  ${FlexRowBetween};
  width: 90%;
  height: 25%;
`;

export const StatText1 = styled(Text)`
  text-align: left;
  width: 80%;
  color: ${({ theme, player }) => theme.game[player + "Text"]};
  font-size: 8;
  font-family: ${({ theme }) => theme.fontFamilyBold};
  text-transform: uppercase;
`;

export const StatText2 = styled(StatText1)`
  width: 20%;
  text-align: right;
`;

export const StatText3 = styled(StatText1)`
  width: 50%;
`;

export const StatText4 = styled(StatText2)`
  width: 50%;
`;

const CLASSIC_STATS = ({ player }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const theme = selectedTheme;

  const {
    gameData,
    gameData: { activePlayer, showStats, p1_DATA, p2_DATA },
  } = useContext(GameContext);

  const p = gameData[player + "_DATA"];

  const animation = useRef(new Animated.Value(activePlayer === "p1" ? 1 : 0))
    .current;
  const drawerAnimation = useRef(new Animated.Value(showStats ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: activePlayer === "p1" ? 1 : 0,
      duration: 300,
    }).start();
  }, [animation, activePlayer]);

  useEffect(() => {
    Animated.timing(drawerAnimation, {
      toValue: showStats ? 1 : 0,
      duration: 300,
    }).start();
  }, [drawerAnimation, showStats]);

  const style1 = () => {
    return createAnimation(theme, animation, false, false, true);
  };

  const top = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["45%", "35%"],
  });

  const AVERAGES = [
    {
      name: "leg",
      value: "legAverage",
    },
    {
      name: "match",
      value: "matchAverage",
    },
    {
      name: "first 9",
      value: "firstNineDartAverage",
    },
    {
      name: "scoring",
      value: "scoringDartsAverage",
    },
  ];
  const TOTALS = [
    {
      name: "60+",
      value: "60",
    },
    {
      name: "100+",
      value: "100",
    },
    {
      name: "140+",
      value: "140",
    },
    {
      name: "180",
      value: "180",
    },
  ];

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
          style={style1()}
          ap={activePlayer}
          player={"p1"}
          theme={theme}
        >
          {AVERAGES.map((item) => (
            <StatRow>
              <StatText1 player={"p1"} theme={theme}>
                {item.name + " average"}
              </StatText1>
              <StatText2 player={"p1"} theme={theme}>
                {p1_DATA[item.value]}
              </StatText2>
            </StatRow>
          ))}
        </Averages>
        <Totals style={style1()} ap={activePlayer} player={"p1"} theme={theme}>
          {TOTALS.map((item) => (
            <StatRow>
              <StatText3 player={"p1"} theme={theme}>
                {item.name}
              </StatText3>
              <StatText4 player={"p1"} theme={theme}>
                {item.value}
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
          style={style1()}
          ap={activePlayer}
          player={"p2"}
          theme={theme}
        >
          {AVERAGES.map((item) => (
            <StatRow>
              <StatText1 player={"p2"} theme={theme}>
                {item.name + " average"}
              </StatText1>
              <StatText2 player={"p2"} theme={theme}>
                {p2_DATA[item.value]}
              </StatText2>
            </StatRow>
          ))}
        </Averages>
        <Totals style={style1()} ap={activePlayer} player={"p2"} theme={theme}>
          {TOTALS.map((item) => (
            <StatRow>
              <StatText3 player={"p2"} theme={theme}>
                {item.name}
              </StatText3>
              <StatText4 player={"p2"} theme={theme}>
                {item.value}
              </StatText4>
            </StatRow>
          ))}
        </Totals>
      </ClassicStatsPlayer2>
    </>
  );
};

export default CLASSIC_STATS;