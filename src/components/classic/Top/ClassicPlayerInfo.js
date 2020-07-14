import React, { useContext, useEffect, useRef } from "react";
import { GameContext } from "../../../contexts/GameContext";
import { SettingsContext } from "../../../contexts/SettingsContext";
import AVATAR from "./ClassicAvatar";
import NAME from "./ClassicName";
import styled from "styled-components";
import { View, Animated } from "react-native";
import { FlexCol, FlexRow } from "../../../styles/css_mixins";
import LEGSET from "./ClassicLegSet";

const PlayerInfoContainer = styled(View)`
  height: 100%;
  width: 50%;
  ${FlexCol};
  position: absolute;
  top: 0;
`;

export const PlayerInfo1 = styled(PlayerInfoContainer)`
  background-color: ${({ theme }) => theme.game.p1Bg};
  left: 0;
`;
export const PlayerInfo2 = styled(PlayerInfoContainer)`
  background-color: ${({ theme }) => theme.game.p2Bg};
  right: 0;
`;

export const PlayerInfoRow = styled(Animated.View)`
  height: 50%;
  position: absolute;
  top: 0;
  width: 100%;
  ${FlexRow};
  border-color: ${({ theme, ap }) => theme.game[ap + "Border"]};
  border-width: ${({ theme }) => theme.borderWidth};
`;

const PLAYER_INFO = ({ player }) => {
  const {
    gameData: { activePlayer },
  } = useContext(GameContext);
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const theme = selectedTheme;

  const animation = useRef(new Animated.Value(activePlayer === "p1" ? 1 : 0))
    .current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: activePlayer === "p1" ? 1 : 0,
      duration: 300,
    }).start();
  }, [animation, activePlayer]);

  const borderColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.game.p2Border, theme.game.p1Border],
  });

  return (
    <>
      {player === "p1" ? (
        <PlayerInfo1 theme={theme}>
          <PlayerInfoRow
            style={{ borderColor }}
            ap={activePlayer}
            theme={theme}
          >
            <AVATAR player={"p1"} />
            <LEGSET player={"p1"} />
          </PlayerInfoRow>
          <NAME player={"p1"} />
        </PlayerInfo1>
      ) : (
        <PlayerInfo2 theme={theme}>
          <PlayerInfoRow ap={activePlayer} theme={theme}>
            <AVATAR player={"p2"} />
            <LEGSET player={"p2"} />
          </PlayerInfoRow>
          <NAME player={"p2"} />
        </PlayerInfo2>
      )}
    </>
  );
};

export default PLAYER_INFO;
