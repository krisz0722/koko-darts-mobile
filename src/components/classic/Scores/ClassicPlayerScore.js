import React, { useContext, useEffect, useRef } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { GameContext } from "../../../contexts/GameContext";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { Animated } from "react-native";
import { AlignText } from "../../../styles/css_mixins";
import createAnimation from "../../../styles/playerSwitchTransition";

export const Text_Score = styled(Animated.Text)`
  position: absolute;
  top: 0;
  border-width: ${({ theme }) => theme.borderWidth};
  color: ${({ player, theme }) => theme.game[player + "Text"]};
  font-family: ${({ theme }) => theme.fontFamily};
  background-color: ${({ player, theme }) => theme.game[player + "Bg"]};
  width: 50%;
  margin: auto;
  ${AlignText};
`;

const Text_Score1 = styled(Text_Score)`
  left: 0;
`;

const Text_Score2 = styled(Text_Score)`
  right: 0;
`;
const PLAYER_SCORE = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const {
    gameData: { activePlayer, showStats, p1_DATA, p2_DATA },
  } = useContext(GameContext);

  const theme = selectedTheme;

  const p1Checkout = p1_DATA.onCheckout;
  const p2Checkout = p2_DATA.onCheckout;

  const animation = useRef(new Animated.Value(activePlayer === "p1" ? 1 : 0))
    .current;
  const animationP1 = useRef(new Animated.Value(p1Checkout ? 1 : 0)).current;
  const animationP2 = useRef(new Animated.Value(p2Checkout ? 1 : 0)).current;
  const fontP1 = useRef(new Animated.Value(p1Checkout ? 1 : 0)).current;
  const fontP2 = useRef(new Animated.Value(p2Checkout ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: activePlayer === "p1" ? 1 : 0,
      duration: 300,
    }).start();
    Animated.timing(animationP1, {
      toValue: p1Checkout ? 1 : 0,
      duration: 300,
    }).start();
    Animated.timing(animationP2, {
      toValue: p2Checkout ? 1 : 0,
      duration: 300,
    }).start();
    Animated.timing(fontP1, {
      toValue: showStats && p1Checkout ? 1 : p1Checkout ? 0.5 : 0,
      duration: 300,
    }).start();
    Animated.timing(fontP2, {
      toValue: showStats && p2Checkout ? 1 : p2Checkout ? 0.5 : 0,
      duration: 300,
    }).start();
  }, [
    activePlayer,
    animation,
    animationP1,
    animationP2,
    fontP1,
    fontP2,
    showStats,
    p1Checkout,
    p2Checkout,
  ]);

  const style = () => {
    return createAnimation(theme, animation, false, false, true);
  };

  const p1Height = animationP1.interpolate({
    inputRange: [0, 1],
    outputRange: ["100%", "50%"],
  });

  const p2Height = animationP2.interpolate({
    inputRange: [0, 1],
    outputRange: ["100%", "50%"],
  });

  const fs1 = selectedTheme.game.score.classic.fs1;
  const fs2 = selectedTheme.game.score.classic.fs2;
  const fs3 = selectedTheme.game.score.classic.fs3;

  const fontSizeP1 = fontP1.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [fs1, fs2, fs3],
  });

  console.log(fs1, fs2, fs3);

  const fontSizeP2 = fontP2.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [fs1, fs2, fs3],
  });

  const style1 = {
    ...style(),
    fontSize: fontSizeP1,
    height: p1Height,
  };

  const style2 = {
    ...style(),
    fontSize: fontSizeP2,
    height: p2Height,
  };
  return (
    <>
      <Text_Score1 style={style1} ap={activePlayer} theme={theme} player={"p1"}>
        {p1_DATA.score}
      </Text_Score1>
      <Text_Score2 style={style2} ap={activePlayer} theme={theme} player={"p2"}>
        {p2_DATA.score}
      </Text_Score2>
    </>
  );
};

export default PLAYER_SCORE;
