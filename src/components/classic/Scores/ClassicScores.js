import React, { useContext } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { GameContext } from "../../../contexts/GameContext";
import CHECKOUTS from "./ClassicPlayersCheckout";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { View } from "react-native";
import { FlexCol, FlexColStart } from "../../../styles/css_mixins";
import PLAYER_SCORE from "./ClassicPlayerScore";

export const ClassicScores = styled(View)`
  ${FlexCol};
  position: absolute;
  top: ${({ showStats }) => (showStats ? "10%" : "15%")};
  width: 100%;
  height: ${({ showStats }) => (showStats ? "25%" : "30%")};
`;

export const ClassicCheckouts = styled(View)`
  ${FlexColStart};
  position: absolute;
  top: 50%;
  width: 100%;
  height: 50%;
  opacity: 1;
`;

export const ClassicPlayerScore = styled(View)`
  ${FlexColStart};
  position: absolute;
  top: 0;
  width: 100%;
  height: ${({ checkout }) => (checkout ? "50%" : "100%")};
  opacity: 1;
`;

const CLASSIC_SCORES = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const {
    gameData: { showStats },
  } = useContext(GameContext);

  const theme = selectedTheme;

  return (
    <ClassicScores showStats={showStats}>
      <ClassicCheckouts theme={theme}>
        <CHECKOUTS player={"p1"} />
        <CHECKOUTS player={"p2"} />
      </ClassicCheckouts>
      <ClassicPlayerScore showStats={showStats} theme={theme}>
        <PLAYER_SCORE player={"p1"} />
        <PLAYER_SCORE player={"p2"} />
      </ClassicPlayerScore>
    </ClassicScores>
  );
};

export default CLASSIC_SCORES;
