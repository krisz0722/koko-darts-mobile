import React, { useContext } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { GameContext } from "../../../contexts/GameContext";
import PLAYER_STATS from "./ClassicPlayerStats";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { View } from "react-native";
import { FlexRow } from "../../../styles/css_mixins";

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
