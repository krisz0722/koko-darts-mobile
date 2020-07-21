import React, { useContext, useEffect, useRef } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { GameContext } from "../../../contexts/GameContext";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { Animated, Text, View } from "react-native";
import { FlexColAround, FlexRowBetween } from "../../../styles/css_mixins";
import DATA_STATS from "./DataStats";
import { ThemeContext } from "../../../contexts/ThemeContext";
export const ClassicStats = styled(Animated.View)`
  ${FlexRowBetween};
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
  width: ${() => (100 / 3) * 2 + "%"};
  height: 100%;
  ${FlexColAround};
  border-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme, ap }) => theme.game[ap + "Border"]};
`;

export const Totals = styled(Animated.View)`
  width: ${() => 100 / 3 + "%"};
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
  font-size: ${({ theme }) => theme.game.stats.classic};
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

const CLASSIC_STATS = () => {
  const { theme, animation } = useContext(ThemeContext);

  const {
    gameData: { activePlayer, showStats, p1_DATA, p2_DATA },
  } = useContext(GameContext);

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
          {DATA_STATS().averages.map((item) => (
            <StatRow key={item.name}>
              <StatText1 player={"p1"} theme={theme}>
                {item.name + " average"}
              </StatText1>
              <StatText2 player={"p1"} theme={theme}>
                {p1_DATA[item.value]}
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
          {DATA_STATS().totals.map((item) => (
            <StatRow key={item.name}>
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
          style={{ borderColor }}
          ap={activePlayer}
          player={"p2"}
          theme={theme}
        >
          {DATA_STATS().averages.map((item) => (
            <StatRow key={item.name}>
              <StatText1 player={"p2"} theme={theme}>
                {item.name + " average"}
              </StatText1>
              <StatText2 player={"p2"} theme={theme}>
                {p2_DATA[item.value]}
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
          {DATA_STATS().totals.map((item) => (
            <StatRow key={item.name}>
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
