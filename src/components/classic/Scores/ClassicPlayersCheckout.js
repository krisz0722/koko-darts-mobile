import React, { useContext, useEffect, useRef } from "react";
import PLAYER_CHECKOUTS from "./ClassicCheckouts";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { Animated, View } from "react-native";
import { FlexColAround } from "../../../styles/css_mixins";
import { GameContext } from "../../../contexts/GameContext";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { ClassicPlayer1Score } from "./ClassicPlayerScore";
import createAnimation from "../../../styles/playerSwitchTransition";

export const ClassicCheckoutsPlayer = styled(View)`
  position: absolute;
  width: 50%;
  bottom: 0;
  height: 100%;
  ${FlexColAround};
  background-color: ${({ theme }) => theme.game.bgOnCheckout};
  border-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme, ap }) => theme.game[ap + "Border"]};
`;
export const ClassicCheckoutsP1 = styled(ClassicCheckoutsPlayer)`
  left: 0;
`;

export const ClassicCheckoutsP2 = styled(ClassicCheckoutsPlayer)`
  right: 0;
`;

const CHECKOUTS = ({ player }) => {
  const {
    gameData: { activePlayer },
  } = useContext(GameContext);

  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const theme = selectedTheme;

  const animation = useRef(new Animated.Value(activePlayer === "p1" ? 1 : 0))
    .current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: activePlayer === "p1" ? 1 : 0,
      duration: 3000,
    }).start();
  }, [animation, activePlayer]);

  const AnimatedView1 = Animated.createAnimatedComponent(ClassicCheckoutsP1);
  const AnimatedView2 = Animated.createAnimatedComponent(ClassicCheckoutsP2);

  const style = () => {
    return createAnimation(theme, animation, false, false, true);
  };

  return (
    <>
      {player === "p1" ? (
        <AnimatedView1 style={style()} theme={selectedTheme} ap={activePlayer}>
          <PLAYER_CHECKOUTS player={"p1"} />
        </AnimatedView1>
      ) : (
        <AnimatedView2 style={style()} theme={selectedTheme} ap={activePlayer}>
          <PLAYER_CHECKOUTS player={"p2"} />
        </AnimatedView2>
      )}
    </>
  );
};

export default CHECKOUTS;
