import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { Animated } from "react-native";
import { GameContext } from "../../../contexts/GameContext";
import { BasicTextBold, FlexCol } from "../../../styles/css_mixins";
import INPUT_BY_DART_FIELD from "./InputByDartField";
import { InputContext } from "../../../contexts/InputContext";

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

const PLAYER_INPUT_INFO = React.memo((props) => {
  const { animation, value, theme, player } = props;

  const {
    gameData,
    gameData: { activePlayer, inactivePlayer },
  } = useContext(GameContext);

  const {
    inputContext: { inputArray, inputMethod, inputByRound, inputByDart },
  } = useContext(InputContext);

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

  const active = player === gameData.settings[activePlayer].key;

  const inputScore =
    inputMethod === "byDart" ? inputArray.join("") : inputByRound.join("");
  const isInvalid = /INVALID/.test(inputScore);

  const inputToDisplay =
    inputMethod === "byRound" ? inputByRound.join("") : inputArray;

  const scoreDisplayText = active
    ? inputToDisplay === ""
      ? "enter score"
      : inputToDisplay
    : "last: " + gameData[inactivePlayer + "_DATA"].lastScore;

  return (
    <>
      {inputMethod === "byDart" && active && !isInvalid ? (
        <INPUT_BY_DART_FIELD
          inputByDart={inputByDart}
          activePlayer={activePlayer}
        />
      ) : (
        <PlayerInputInfo
          isInvalid={isInvalid}
          active={active}
          ap={activePlayer}
          style={{ borderColor }}
          theme={theme}
        >
          <>
            <Text_Function theme={theme}>{value}</Text_Function>
            <Text_Function theme={theme}>{scoreDisplayText}</Text_Function>
          </>
        </PlayerInputInfo>
      )}
    </>
  );
});

export default PLAYER_INPUT_INFO;
