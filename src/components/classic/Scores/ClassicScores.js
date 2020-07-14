import React, { useContext, useEffect, useRef } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { GameContext } from "../../../contexts/GameContext";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { Animated, View } from "react-native";
import {
  AlignText,
  FlexCol,
  FlexColAround,
  FlexColStart,
} from "../../../styles/css_mixins";
import PLAYER_CHECKOUTS from "./ClassicCheckoutsDiv";
import createAnimation from "../../../styles/playerSwitchTransition";
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

export const ClassicPlayerScore = styled(Animated.View)`
  ${FlexCol};
  position: absolute;
  width: 50%;
  height: 100%;
  margin: auto;
  top: 0%;
  background-color: ${({ player, theme }) => theme.game[player + "Bg"]};
  border-width: ${({ theme }) => theme.borderWidth};
`;

const CLASSIC_SCORES = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const {
    gameData: { activePlayer, showStats, p1_DATA, p2_DATA },
  } = useContext(GameContext);

  const theme = selectedTheme;

  const animation = useRef(new Animated.Value(activePlayer === "p1" ? 1 : 0))
    .current;
  const animation2 = useRef(new Animated.Value(0)).current;
  const checkoutAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: activePlayer === "p1" ? 1 : 0,
      duration: 3000,
    }).start();
    Animated.timing(animation2, {
      toValue: showStats ? 1 : 0,
      duration: 3000,
    }).start();
  }, [animation, animation2, showStats, activePlayer]);

  const style = () => {
    return createAnimation(theme, animation, false, false, true);
  };

  const top = animation2.interpolate({
    inputRange: [0, 1],
    outputRange: ["15%", "10%"],
  });

  const height = animation2.interpolate({
    inputRange: [0, 1],
    outputRange: ["30%", "25%"],
  });

  return (
    <ClassicScores style={{ top, height }} showStats={showStats}>
      <ClassicCheckoutsP1
        style={style()}
        theme={selectedTheme}
        ap={activePlayer}
      >
        <PLAYER_CHECKOUTS player={"p1"} />
      </ClassicCheckoutsP1>
      <ClassicCheckoutsP2
        style={style()}
        theme={selectedTheme}
        ap={activePlayer}
      >
        <PLAYER_CHECKOUTS player={"p2"} />
      </ClassicCheckoutsP2>
      <PLAYER_SCORE />
    </ClassicScores>
  );
};

export default CLASSIC_SCORES;
