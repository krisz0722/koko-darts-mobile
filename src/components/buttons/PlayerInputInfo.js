import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { Animated } from "react-native";
import { SettingsContext } from "../../contexts/SettingsContext";
import { GameContext } from "../../contexts/GameContext";
import { BasicTextBold, FlexCol } from "../../styles/css_mixins";
import INPUT_BY_DART_FIELD from "./InputByDartField";

export const PlayerInputInfo = styled(Animated.View)`
  ${FlexCol};
  width: ${() => 100 / 3 + "%"};
  height: 50%;
  background-color: ${({ theme }) => theme.game.middle.bgMid};
  border-color: ${({ theme, ap }) => theme.game[ap + "Border"]};
  border-width: ${({ theme }) => theme.borderWidth};
`;

export const Text_Function = styled(Animated.Text)`
  ${BasicTextBold};
  height: 50%;
  width: 100%;
  font-size: ${({ theme }) => theme.game.buttonFontSize.function};
  color: ${({ theme }) => theme.text};
`;

const PLAYER_INPUT_INFO = ({ disabled, value, name }) => {
  const {
    settings: { selectedTheme, animation },
  } = useContext(SettingsContext);

  const theme = selectedTheme;
  const {
    gameData,
    gameData: { activePlayer, inactivePlayer, isInputByDart, inputByRound },
  } = useContext(GameContext);

  const animationValue = useRef(
    new Animated.Value(activePlayer === "p1" ? 1 : 0),
  ).current;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: activePlayer === "p1" ? 1 : 0,
      duration: 300,
    }).start();
  }, [animationValue, activePlayer]);

  const borderColor = animation
    ? animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.game.p2Border, theme.game.p1Border],
      })
    : theme.game[activePlayer + "Border"];

  const scoreDisplayText =
    name === activePlayer
      ? "current:" + inputByRound.join("")
      : "last:" + gameData[inactivePlayer + "_DATA"].lastScore;

  return (
    <>
      {isInputByDart && activePlayer === name ? (
        <INPUT_BY_DART_FIELD />
      ) : (
        <PlayerInputInfo
          ap={activePlayer}
          style={{ borderColor }}
          disabled={disabled}
          name={name}
        >
          <>
            <Text_Function theme={selectedTheme}>{value}</Text_Function>
            <Text_Function theme={selectedTheme}>
              {scoreDisplayText}
            </Text_Function>
          </>
        </PlayerInputInfo>
      )}
    </>
  );
};

export default PLAYER_INPUT_INFO;
