import React, { useContext, useEffect, useRef } from "react";
import { GameContext } from "../../../contexts/GameContext";
import styled from "styled-components";
import { Animated, View } from "react-native";
import { Window } from "../../../styles/css_mixins";
import { SettingsContext } from "../../../contexts/SettingsContext";

const PlayerInfoAvatar = styled(Animated.View)`
  height: 100%;
  position: absolute;
  top: 0;
  background-color: blue;
`;

export const Avatar1 = styled(PlayerInfoAvatar)`
  left: 0;
  border-right-width: ${({ theme }) => theme.borderWidth};
`;

export const Avatar2 = styled(PlayerInfoAvatar)`
  right: 0;
  border-left-width: ${({ theme }) => theme.borderWidth};
`;

const AVATAR = ({ player }) => {
  const {
    gameData: { showStats, activePlayer },
  } = useContext(GameContext);

  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const theme = selectedTheme;

  const animation = useRef(new Animated.Value(activePlayer === "p1" ? 1 : 0))
    .current;
  const resize = useRef(new Animated.Value(showStats ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: activePlayer === "p1" ? 1 : 0,
      duration: 300,
    }).start();
  }, [animation, activePlayer]);

  useEffect(() => {
    Animated.timing(resize, {
      toValue: showStats ? 1 : 0,
      duration: 300,
    }).start();
  }, [resize, showStats]);

  const width = resize.interpolate({
    inputRange: [0, 1],
    outputRange: [Window.height * 0.075, Window.height * 0.05],
  });

  const borderColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.game.p2Border, theme.game.p1Border],
  });

  return (
    <>
      {player === "p1" ? (
        <Avatar1
          style={{ width, borderColor }}
          ap={activePlayer}
          showStats={showStats}
        />
      ) : (
        <Avatar2
          style={{ width, borderColor }}
          ap={activePlayer}
          showStats={showStats}
        />
      )}
    </>
  );
};

export default AVATAR;
