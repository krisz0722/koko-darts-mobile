import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { Animated } from "react-native";
import { GameContext } from "../../../contexts/GameContext";
import { BasicTextBold, FlexCol } from "../../../styles/css_mixins";
import INPUT_BY_DART_FIELD from "../../buttons/InputByDartField";
import { ThemeContext } from "../../../contexts/ThemeContext";
export const PlayerInputInfo = styled(Animated.View)`
  ${FlexCol};
  width: ${() => 100 / 3 + "%"};
  height: 50%;
  background-color: ${({ theme, active, isInvalid }) =>
    isInvalid && active
      ? theme.bgRed
      : active
      ? theme.bgGreen
      : theme.game.middle.bgMid};
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

const PLAYER_INPUT_INFO = ({ value, player }) => {
  const { theme, animation } = useContext(ThemeContext);

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

  const active = player === gameData[activePlayer];

  const inputScore = inputByRound.join("");
  const isInvalid = /INVALID/.test(inputScore);

  console.log(isInvalid);

  const scoreDisplayText = active
    ? inputScore === ""
      ? "enter score"
      : inputByRound.join("")
    : "last: " + gameData[inactivePlayer + "_DATA"].lastScore;

  return (
    <>
      {isInputByDart && gameData[activePlayer] === player ? (
        <INPUT_BY_DART_FIELD />
      ) : (
        <PlayerInputInfo
          isInvalid={isInvalid}
          active={player === gameData[activePlayer]}
          ap={activePlayer}
          style={{ borderColor }}
        >
          <>
            <Text_Function theme={theme}>{value}</Text_Function>
            <Text_Function theme={theme}>{scoreDisplayText}</Text_Function>
          </>
        </PlayerInputInfo>
      )}
    </>
  );
};

export default PLAYER_INPUT_INFO;
