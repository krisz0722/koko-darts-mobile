import React, { useState, useEffect, useRef, useContext } from "react";
import { Animated, View, Image, ImageBackground } from "react-native";
import styled from "styled-components";
import CLASSIC_SCORES from "../../components/classic/Scores/ClassicScores";
import CLASSIC_MIDDLE from "../../components/classic/Middle/ClassicMiddle";
import CLASSIC_BOTTOM from "../../components/classic/Bottom/ClassicBottom";
import CLASSIC_TOP from "../../components/classic/Top/ClassicTop";
import CLASSIC_STATS from "../../components/classic/Stats/ClassicStats";
import { Window } from "../../styles/css_mixins";
import { SettingsContext } from "../../contexts/SettingsContext";
import { GameContext } from "../../contexts/GameContext";
import { BlurView } from "@react-native-community/blur";

const GameWindow = styled(Animated.View)`
  position: absolute;
  width: ${({ preview }) => (preview ? Window.width : "100%")};
  height: ${({ preview }) => (preview ? Window.height : "100%")};
  transform: ${({ preview }) => (preview ? "scale(0.32, 0.32)" : null)};
`;

const Overlay = styled(BlurView)`
  position: absolute;
  top: 0;
  height: 45%;
  width: 50%;
  z-index: 3;
`;

const Overlay1 = styled(Overlay)`
  left: 0;
  background-color: ${({ theme }) => theme.game.p1Overlay};
`;
const Overlay2 = styled(Overlay)`
  right: 0;
  background-color: ${({ theme }) => theme.game.p2Overlay};
`;

const GAME_CLASSIC = ({ preview = false }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);
  const theme = selectedTheme;

  const {
    gameData: { inactivePlayer },
  } = useContext(GameContext);

  return (
    <GameWindow preview={preview}>
      <CLASSIC_TOP />
      <CLASSIC_SCORES />
      <CLASSIC_STATS />
      <CLASSIC_MIDDLE />
      <CLASSIC_BOTTOM />
    </GameWindow>
  );
};

export default GAME_CLASSIC;
