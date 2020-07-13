import React, { useContext } from "react";
import { GameContext } from "../../../contexts/GameContext";
import { SettingsContext } from "../../../contexts/SettingsContext";
import styled from "styled-components";
import { View, Text } from "react-native";
import {
  AlignText,
  FlexCol,
  FlexRow,
  Window,
} from "../../../styles/css_mixins";

const PLayerInfoLegSet = styled(View)`
  height: 100%;
  ${FlexRow};
  position: absolute;
  top: 0;
  width: ${({ width }) => width};
  border-color: ${({ theme, ap }) => theme.game[ap + "Border"]};
`;

export const LegSet1 = styled(PLayerInfoLegSet)`
  right: 0;
  border-left-width: ${({ theme, ap }) => theme.borderWidth};
`;

export const LegSet2 = styled(PLayerInfoLegSet)`
  left: 0;
  border-right-width: ${({ theme, ap }) => theme.borderWidth};
`;

export const PlayerLegSet = styled(View)`
  height: 100%;
  width: 50%;
  ${FlexCol};
`;

export const Text_Main = styled(Text)`
  font-size: 25;
  color: ${({ player, theme }) => theme.game[player + "Text"]};
`;

const Text_Sub = styled(Text_Main)`
  font-size: 20;
`;

const LEGSET = ({ player }) => {
  const {
    gameData: { showStats, legOrSet, activePlayer, p1_DATA, p2_DATA },
  } = useContext(GameContext);

  const width = showStats
    ? Window.width / 2 - Window.height * 0.05
    : Window.width / 2 - Window.height * 0.075;

  return (
    <>
      {player === "p1" ? (
        <LegSet1 ap={activePlayer} showStats={showStats} width={width}>
          <PlayerLegSet>
            <Text_Sub player={"p1"}>({p1_DATA.legsWon})</Text_Sub>
          </PlayerLegSet>
          <PlayerLegSet>
            <Text_Main player={"p1"}>
              {legOrSet === "set" ? p1_DATA.setsWon : p1_DATA.legsWon}
            </Text_Main>
          </PlayerLegSet>
        </LegSet1>
      ) : (
        <LegSet2 ap={activePlayer} showStats={showStats} width={width}>
          <PlayerLegSet>
            <Text_Main player={"p2"}>
              {legOrSet === "set" ? p1_DATA.setsWon : p1_DATA.legsWon}
            </Text_Main>
          </PlayerLegSet>
          <PlayerLegSet>
            <Text_Sub player={"p2"}>({p1_DATA.legsWon})</Text_Sub>
          </PlayerLegSet>
        </LegSet2>
      )}
    </>
  );
};

export default LEGSET;
