import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { Animated, Text, View } from "react-native";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { GameContext } from "../../../contexts/GameContext";
import { AlignText, FlexCol } from "../../../styles/css_mixins";
import createAnimation from "../../../styles/playerSwitchTransition";

export const ClassicPlayerScore = styled(View)`
  ${FlexCol};
  position: absolute;
  width: 50%;
  height: 100%;
  margin: auto;
  background-color: ${({ player, theme }) => theme.game[player + "Bg"]};
  border-width: ${({ theme }) => theme.borderWidth};
`;

export const ClassicPlayer1Score = styled(ClassicPlayerScore)`
  left: 0;
`;
export const ClassicPlayer2Score = styled(ClassicPlayerScore)`
  right: 0;
`;

export const Text_Score = styled(Text)`
  color: ${({ player, theme }) => theme.game[player + "Text"]};
  font-size: 40;
  font-family: ${({ theme }) => theme.fontFamily};
  background-color: ${({ player, theme }) => theme.game[player + "Bg"]};
  width: 100%;
  height: 100%;
  margin: auto;
  ${AlignText};
`;

const PLAYER_SCORE = ({ player }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const {
    gameData: { activePlayer, showStats, p1_DATA, p2_DATA },
  } = useContext(GameContext);

  const theme = selectedTheme;

  const animation = useRef(new Animated.Value(activePlayer === "p1" ? 1 : 0))
    .current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: activePlayer === "p1" ? 1 : 0,
      duration: 3000,
    }).start();
  }, [animation, activePlayer]);

  const AnimatedView1 = Animated.createAnimatedComponent(ClassicPlayer1Score);
  const AnimatedView2 = Animated.createAnimatedComponent(ClassicPlayer2Score);
  const AnimatedText = Animated.createAnimatedComponent(Text_Score);

  const style1 = () => {
    return createAnimation(theme, animation, false, false, true);
  };

  console.log(style1());

  return (
    <>
      {player === "p1" ? (
        <AnimatedView1
          showStats={showStats}
          checkout={p1_DATA.onCheckout}
          ap={activePlayer}
          theme={theme}
          player={"p1"}
        >
          <AnimatedText ap={activePlayer} theme={theme} player={"p1"}>
            {p1_DATA.score}
          </AnimatedText>
        </AnimatedView1>
      ) : (
        <AnimatedView2
          showStats={showStats}
          checkout={p2_DATA.onCheckout}
          ap={activePlayer}
          theme={theme}
          player={"p2"}
        >
          <AnimatedText ap={activePlayer} theme={theme} player={"p2"}>
            {p2_DATA.score}
          </AnimatedText>
        </AnimatedView2>
      )}
    </>
  );
};

export default PLAYER_SCORE;
