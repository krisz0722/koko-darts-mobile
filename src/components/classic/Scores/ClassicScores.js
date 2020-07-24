import React, { useContext, useEffect, useRef } from "react";
import { GameContext } from "../../../contexts/GameContext";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { Animated } from "react-native";
import { FlexColAround } from "../../../styles/css_mixins";
import PLAYER_CHECKOUTS from "./ClassicCheckoutsDiv";
import PLAYER_SCORE from "./ClassicPlayerScore";

export const ClassicScores = styled(Animated.View)`
  ${FlexColAround};
  position: absolute;
  top: ${({ showStats }) => (showStats ? "10%" : "15%")};
  width: 100%;
  height: ${({ showStats }) => (showStats ? "25%" : "30%")};
`;

export const ClassicCheckoutsPlayer = styled(Animated.View)`
  position: absolute;
  width: 50%;
  bottom: 0;
  height: 50%;
  ${FlexColAround};
  background-color: ${({ theme }) => theme.game.bgOnCheckout};
  border-width: ${({ theme }) => theme.borderWidth};
`;
export const ClassicCheckoutsP1 = styled(ClassicCheckoutsPlayer)`
  left: 0;
`;

export const ClassicCheckoutsP2 = styled(ClassicCheckoutsPlayer)`
  right: 0;
`;

const CLASSIC_SCORES = React.memo((props) => {
  const { activePlayer, startingScore, showStats, animation, theme } = props;

  const {
    gameData: { p1_DATA, p2_DATA },
  } = useContext(GameContext);

  const animationValue = useRef(
    new Animated.Value(activePlayer === "p1" ? 1 : 0),
  ).current;
  const animationValue2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: activePlayer === "p1" ? 1 : 0,
      duration: 300,
    }).start();
    Animated.timing(animationValue2, {
      toValue: showStats ? 1 : 0,
      duration: 300,
    }).start();
  }, [animationValue, animationValue2, showStats, activePlayer]);

  const borderColor = animation
    ? animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.game.p2Border, theme.game.p1Border],
      })
    : theme.game[activePlayer + "Border"];

  const top = animation
    ? animationValue2.interpolate({
        inputRange: [0, 1],
        outputRange: ["15%", "10%"],
      })
    : showStats
    ? "10%"
    : "15%";

  const height = animation
    ? animationValue2.interpolate({
        inputRange: [0, 1],
        outputRange: ["30%", "25%"],
      })
    : showStats
    ? "25%"
    : "30%";

  console.log("RENDER SCORE");

  return (
    <ClassicScores style={{ top, height }} showStats={showStats}>
      <ClassicCheckoutsP1
        style={{ borderColor }}
        theme={theme}
        ap={activePlayer}
      >
        <PLAYER_CHECKOUTS theme={theme} playerData={p1_DATA} />
      </ClassicCheckoutsP1>
      <ClassicCheckoutsP2
        style={{ borderColor }}
        theme={theme}
        ap={activePlayer}
      >
        <PLAYER_CHECKOUTS theme={theme} playerData={p2_DATA} />
      </ClassicCheckoutsP2>
      <PLAYER_SCORE
        theme={theme}
        activePlayer={activePlayer}
        showStats={showStats}
        p1_DATA={p1_DATA}
        p2_DATA={p2_DATA}
        startingScore={startingScore}
      />
    </ClassicScores>
  );
});

export default CLASSIC_SCORES;
