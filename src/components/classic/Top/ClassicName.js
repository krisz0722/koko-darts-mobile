import React, { useContext } from "react";
import { GameContext } from "../../../contexts/GameContext";
import styled from "styled-components";
import { Text, View } from "react-native";
import { AlignText, FlexRow, Window } from "../../../styles/css_mixins";
import { SettingsContext } from "../../../contexts/SettingsContext";

export const PlayerInfoName = styled(Text)`
  height: 50%;
  width: 100%;
  position: absolute;
  bottom: 0;
  ${FlexRow};
  ${AlignText};
  color: ${({ theme, player }) => theme.game[player + "Text"]};
  border-color: ${({ theme, ap }) => theme.game[ap + "Border"]};
  border-width: ${({ theme }) => theme.borderWidth};
  background-color: ${({ theme, active }) =>
    active ? theme.bgGreen : "transparent"};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 20;
  text-transform: uppercase;
`;

const NAME = ({ player }) => {
  const {
    gameData,
    gameData: { p1, p2, activePlayer },
  } = useContext(GameContext);

  return (
    <PlayerInfoName player={player} ap={activePlayer}>
      {gameData[player]}
    </PlayerInfoName>
  );
};

export default NAME;
