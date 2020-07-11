import React, { useContext } from "react";
import styled from "styled-components";
import { ClassicTop } from "../containers/ClassicWindow";
import { GameContext } from "../../contexts/GameContext";
import { Text, View } from "react-native";
import { FlexCol, FlexRow } from "../../styles/css_mixins";
import { SettingsContext } from "../../contexts/SettingsContext";

const PlayerInfoContainer = styled(View)`
  height: 100%;
  width: 100%;
  ${FlexCol};
  position: absolute;
  top: 0;
`;

export const PlayerInfo1 = styled(PlayerInfoContainer)`
  background-color: ${({ theme }) => theme.game.p1Bg};
  width: 50%;
  left: 0;
`;
export const PlayerInfo2 = styled(PlayerInfoContainer)`
  background-color: ${({ theme }) => theme.game.p2Bg};
  width: 50%;
  right: 0;
`;

const PlayerInfoRow = styled(View)`
  height: 50%;
  width: 100%;
  ${FlexRow};
  border-color: ${({ theme, ap }) => theme.game[ap + "Border"]};
  border-width: ${({ theme }) => theme.borderWidth};
`;

const PlayerInfoName = styled(PlayerInfoRow)`
  background-color: ${({ theme, active }) =>
    active ? theme.bgGreen : "transparent"};
`;

const CLASSIC_TOP = () => {
  const {
    gameData: { activePlayer, p1, p2, showStats },
  } = useContext(GameContext);
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const theme = selectedTheme;

  return (
    <ClassicTop showStats={showStats}>
      <PlayerInfo1 theme={theme}>
        <PlayerInfoRow ap={activePlayer} theme={theme}></PlayerInfoRow>
        <PlayerInfoName
          ap={activePlayer}
          active={activePlayer === "p1"}
          theme={theme}
        ></PlayerInfoName>
      </PlayerInfo1>
      <PlayerInfo2 theme={theme}>
        <PlayerInfoRow ap={activePlayer} theme={theme}></PlayerInfoRow>
        <PlayerInfoName
          ap={activePlayer}
          active={activePlayer === "p2"}
          theme={theme}
        ></PlayerInfoName>
      </PlayerInfo2>
    </ClassicTop>
  );
};

export default CLASSIC_TOP;
