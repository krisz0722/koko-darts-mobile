import React, { useContext } from "react";
import { GameContext } from "../../../contexts/GameContext";
import { SettingsContext } from "../../../contexts/SettingsContext";
import styled from "styled-components";
import { View } from "react-native";
import { Window } from "../../../styles/css_mixins";

const PlayerInfoAvatar = styled(View)`
  height: 100%;
  position: absolute;
  top: 0;
  width: ${({ width }) => width};
  border-color: ${({ theme, ap }) => theme.game[ap + "Border"]};
`;

export const Avatar1 = styled(PlayerInfoAvatar)`
  left: 0;
  border-right-width: ${({ theme, ap }) => theme.borderWidth};
`;

export const Avatar2 = styled(PlayerInfoAvatar)`
  right: 0;
  border-left-width: ${({ theme, ap }) => theme.borderWidth};
`;

const AVATAR = ({ player }) => {
  const {
    gameData: { showStats, activePlayer },
  } = useContext(GameContext);

  const width = showStats ? Window.height * 0.05 : Window.height * 0.075;

  return (
    <>
      {player === "p1" ? (
        <Avatar1 ap={activePlayer} showStats={showStats} width={width} />
      ) : (
        <Avatar2 ap={activePlayer} showStats={showStats} width={width} />
      )}
    </>
  );
};

export default AVATAR;
