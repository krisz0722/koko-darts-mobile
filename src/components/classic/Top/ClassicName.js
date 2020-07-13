import React, { useContext } from "react";
import { GameContext } from "../../../contexts/GameContext";
import styled from "styled-components";
import { Text, View } from "react-native";
import { FlexRow } from "../../../styles/css_mixins";

export const PlayerInfoName = styled(View)`
  height: 50%;
  width: 100%;
  position: absolute;
  bottom: 0;
  ${FlexRow};
  border-color: ${({ theme, ap }) => theme.game[ap + "Border"]};
  border-width: ${({ theme }) => theme.borderWidth};
  background-color: ${({ theme, active }) =>
    active ? theme.bgGreen : "transparent"};
`;

export const Text_Name = styled(Text)`
  color: ${({ theme, player }) => theme.game[player + "Text"]};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 20;
  text-transform: uppercase;
`;

const NAME = ({ player }) => {
  const {
    gameData,
    gameData: { activePlayer },
  } = useContext(GameContext);

  return (
    <PlayerInfoName player={player} ap={activePlayer}>
      <Text_Name player={player} ap={activePlayer}>
        {gameData[player]}
      </Text_Name>
    </PlayerInfoName>
  );
};

export default NAME;
