import React, { useContext, useEffect, useRef } from "react";
import { GameContext } from "../../../contexts/GameContext";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { Animated, View } from "react-native";
import {
  Absolute,
  FlexCol,
  FlexColStart,
  FlexRow,
} from "../../../styles/css_mixins";
import { SettingsContext } from "../../../contexts/SettingsContext";
import AVATAR from "./ClassicAvatar";
import LEGSET from "./ClassicLegSet";
import NAME from "./ClassicName";

export const ClassicTop = styled(Animated.View)`
  ${FlexColStart};
  ${Absolute};
  width: 100%;
`;

const PlayerInfoContainer = styled(View)`
  height: 100%;
  width: 50%;
  ${FlexCol};
  position: absolute;
  top: 0;
`;

export const PlayerInfo1 = styled(PlayerInfoContainer)`
  background-color: ${({ theme }) => theme.game.p1Bg};
  left: 0;
`;
export const PlayerInfo2 = styled(PlayerInfoContainer)`
  background-color: ${({ theme }) => theme.game.p2Bg};
  right: 0;
`;

export const PlayerInfoRow = styled(Animated.View)`
  height: 50%;
  position: absolute;
  top: 0;
  width: 100%;
  ${FlexRow};
  border-color: ${({ theme, ap }) => theme.game[ap + "Border"]};
  border-width: ${({ theme }) => theme.borderWidth};
`;

const CLASSIC_TOP = () => {
  const {
    gameData: { activePlayer, showStats },
  } = useContext(GameContext);
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const theme = selectedTheme;

  const animation = useRef(new Animated.Value(activePlayer === "p1" ? 1 : 0))
    .current;
  const resize = useRef(new Animated.Value(showStats ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: activePlayer === "p1" ? 1 : 0,
      duration: 300,
    }).start();
  }, [animation, activePlayer]);

  useEffect(() => {
    Animated.timing(resize, {
      toValue: showStats ? 1 : 0,
      duration: 300,
    }).start();
  }, [resize, showStats]);

  const height = resize.interpolate({
    inputRange: [0, 1],
    outputRange: ["15%", "10%"],
  });

  const borderColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.game.p2Border, theme.game.p1Border],
  });

  return (
    <ClassicTop style={{ height }} showStats={showStats}>
      <PlayerInfo1 theme={theme}>
        <PlayerInfoRow style={{ borderColor }} ap={activePlayer} theme={theme}>
          <AVATAR player={"p1"} />
          <LEGSET player={"p1"} />
        </PlayerInfoRow>
        <NAME player={"p1"} />
      </PlayerInfo1>
      <PlayerInfo2 theme={theme}>
        <PlayerInfoRow style={{ borderColor }} ap={activePlayer} theme={theme}>
          <AVATAR player={"p2"} />
          <LEGSET player={"p2"} />
        </PlayerInfoRow>
        <NAME player={"p2"} />
      </PlayerInfo2>
    </ClassicTop>
  );
};

export default CLASSIC_TOP;
