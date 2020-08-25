import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Animated } from "react-native";
import { Window } from "../../../styles/css_mixins";

const PlayerInfoAvatar = styled(Animated.Image)`
  height: 100%;
  position: absolute;
  top: 0;
`;

export const Avatar1 = styled(PlayerInfoAvatar)`
  left: 0;
  border-right-width: ${({ theme }) => theme.borderWidth};
`;

export const Avatar2 = styled(PlayerInfoAvatar)`
  right: 0;
  border-left-width: ${({ theme }) => theme.borderWidth};
`;

const AVATAR = React.memo((props) => {
  const { player, showStats, img, activePlayer, theme, animation } = props;

  const animationValue = useRef(
    new Animated.Value(activePlayer === "p1" ? 1 : 0),
  ).current;
  const resize = useRef(new Animated.Value(showStats ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: activePlayer === "p1" ? 1 : 0,
      duration: 300,
    }).start();
  }, [animationValue, activePlayer]);

  useEffect(() => {
    Animated.timing(resize, {
      toValue: showStats ? 1 : 0,
      duration: 300,
    }).start();
  }, [resize, showStats]);

  const width = animation
    ? resize.interpolate({
        inputRange: [0, 1],
        outputRange: [Window.height * 0.075, Window.height * 0.05],
      })
    : showStats
    ? 0.05
    : 0.075;

  const borderColor = animation
    ? animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.game.p2Border, theme.game.p1Border],
      })
    : theme.game[activePlayer + "Border"];

  console.log("P1", img);
  return (
    <>
      {player === "p1" ? (
        <>
          {img === "" ? (
            <Avatar1
              source={require("../../../../assets/bg.png")}
              style={{ width, borderColor }}
              ap={activePlayer}
              showStats={showStats}
            />
          ) : (
            <Avatar1
              source={{ uri: img }}
              style={{ width, borderColor }}
              ap={activePlayer}
              showStats={showStats}
            />
          )}
        </>
      ) : (
        <>
          {img === "" ? (
            <Avatar2
              source={require("../../../../assets/bg.png")}
              style={{ width, borderColor }}
              ap={activePlayer}
              showStats={showStats}
            />
          ) : (
            <Avatar2
              source={{ uri: img }}
              style={{ width, borderColor }}
              ap={activePlayer}
              showStats={showStats}
            />
          )}
        </>
      )}
    </>
  );
});

export default AVATAR;
