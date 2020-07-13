import React, { useContext, useEffect, useRef, useState } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { GameContext } from "../../../contexts/GameContext";
import PLAYER_STATS from "./ClassicPlayerStats";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { Animated, View } from "react-native";
import { FlexRow, Window } from "../../../styles/css_mixins";
import { View_Headers } from "../../containers/Welcome";

export const ClassicStats = styled(View)`
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

const CLASSIC_STATS = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const {
    gameData: { showStats },
  } = useContext(GameContext);

  const theme = selectedTheme;

  const [top, setTop] = useState(0);

  // useEffect(() => {
  //   setTop(showStats ? Window.height * 0.1 : 0);
  //   Animated.timing(transform, {
  //     toValue: showStats ? 1 : 0,
  //     duration: 1000,
  //     useNativeDriver: true,
  //   }).start();
  // }, [showStats]);

  const transform = useRef(new Animated.Value(0)).current;

  const topPosition = transform.interpolate({
    inputRange: [0, 1],
    outputRange: [Window.height * 0.1, 0],
  });

  const AnimatedStat1 = Animated.createAnimatedComponent(ClassicStatsPlayer1);
  const AnimatedStat2 = Animated.createAnimatedComponent(ClassicStatsPlayer2);

  return (
    <>
      <ClassicStatsPlayer1 player={"p1"} showStats={showStats} theme={theme}>
        <PLAYER_STATS player={"p1"} />
      </ClassicStatsPlayer1>
      <ClassicStatsPlayer2 player={"p2"} showStats={showStats} theme={theme}>
        <PLAYER_STATS player={"p2"} />
      </ClassicStatsPlayer2>
    </>
  );
};

export default CLASSIC_STATS;
