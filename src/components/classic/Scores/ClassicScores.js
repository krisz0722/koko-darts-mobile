import React, { useContext } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { GameContext } from "../../../contexts/GameContext";
import CHECKOUTS from "./ClassicPlayersCheckout";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { View } from "react-native";
import { FlexCol, FlexColStart, FlexRow } from "../../../styles/css_mixins";
import PLAYER_SCORE from "./ClassicPlayerScore";

export const ClassicScores = styled(View)`
  ${FlexCol};
  position: absolute;
  top: 15%;
  top: ${({ showStats }) => (showStats ? "10%" : "15%")};
  width: 100%;
  height: ${({ showStats }) => (showStats ? "25%" : "30%")};
`;

export const ClassicCheckouts = styled(View)`
  ${FlexColStart};
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50%;
`;

export const ClassicCurrentScores = styled(View)`
  ${FlexRow};
  width: 100%;
  height: 100%;
  border-color: ${({ ap, theme }) => theme.game[ap + "Border"]};
  border-width: ${({ theme }) => theme.borderWidth};
`;

const CLASSIC_SCORES = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const theme = selectedTheme;

  const {
    gameData: { activePlayer, showStats, p1_DATA, p2_DATA },
  } = useContext(GameContext);

  return (
    <ClassicScores ap={activePlayer} theme={theme} showStats={showStats}>
      <ClassicCheckouts theme={theme}>
        <CHECKOUTS player={"p1"} />
        <CHECKOUTS player={"p2"} />
      </ClassicCheckouts>
      <ClassicCurrentScores
        ap={activePlayer}
        theme={theme}
        showStats={showStats}
      >
        <PLAYER_SCORE player={"p1"} />
        <PLAYER_SCORE player={"p2"} />
      </ClassicCurrentScores>
    </ClassicScores>
  );
};

export default CLASSIC_SCORES;
