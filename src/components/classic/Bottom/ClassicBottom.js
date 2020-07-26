import React, { useState, useContext, useCallback, useEffect } from "react";
import { Animated } from "react-native";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { FlexRow } from "../../../styles/css_mixins";
import NUM_BUTTON from "../../buttons/NumButton";
import FUNCTION_BUTTON from "../../buttons/FunctionButton";
import { InputContext } from "../../../contexts/InputContext";
import { GameContext } from "../../../contexts/GameContext";
import { VALIDSCORES } from "../../../calc/scores";

export const ClassicBottom = styled(Animated.View)`
  ${FlexRow};
  flex-wrap: wrap;
  position: absolute;
  top: 63%;
  width: 100%;
  height: 37%;
`;

const CLASSIC_BOTTOM = (props) => {
  const { animation, theme, activePlayer, inactivePlayer } = props;
  const {
    inputContext: { inputMethod, inputByRound, inputByDart, whichDart },
    dispatchInput,
  } = useContext(InputContext);

  const { dispatchGameData, gameData } = useContext(GameContext);

  const playerKey = activePlayer + "_DATA";
  const playerDATA = gameData[playerKey];
  const canGoBack = gameData[inactivePlayer + "_DATA"].canGoBack;

  const backOrClear =
    inputByRound[0] === "" && inputByDart.first[0] === "" && canGoBack
      ? "UNDO"
      : "CLEAR";

  const okOrNext = inputMethod === "byDart" && whichDart !== 3 ? "NEXT" : "OK";

  const dispatchUndoOrClear = () => {
    if (backOrClear === "CLEAR") {
      dispatchInput({ type: "CLEAR_BY_DART" });
    } else {
      dispatchGameData({ type: "UNDO" });
    }
  };

  const dispatchOkOrNext = () => {
    if (inputMethod === "byDart") {
      dispatchInput({
        type: "NEXT",
        value: playerDATA.score,
      });
    } else {
      const scoreToSubmit = parseInt(inputByRound.join(""));
      const isValid = VALIDSCORES.indexOf(scoreToSubmit) !== -1;
      if (isValid) {
        dispatchGameData({
          type: "SUBMIT",
          playerKey,
          value: scoreToSubmit,
          method: "SUBMIT",
        });
        dispatchInput({ type: "SET_DEFAULT" });
      } else {
        dispatchInput({ type: "INVALID" });
      }
    }
  };

  const typeMethod = useCallback(
    (value) => {
      dispatchInput({ type: "TYPE", value });
    },
    [dispatchInput],
  );

  const DATA_BOTTOM = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    {
      value: backOrClear,
      action: dispatchUndoOrClear,
      icon: backOrClear === "CLEAR" ? "clear" : "replay",
    },
    0,

    {
      value: okOrNext,
      action: dispatchOkOrNext,
      icon: okOrNext === "OK" ? "check" : "dart",
    },
  ];

  useEffect(() => {
    const { first, second, third } = inputByDart;
    const scoreToSubmit = first + second + third;
    if (whichDart === 4) {
      dispatchGameData({
        type: "SUBMIT",
        playerKey,
        value: scoreToSubmit,
        method: "UPDATE",
      });
      dispatchInput({ type: "SET_DEFAULT" });
    }
  }, [
    playerKey,
    activePlayer,
    dispatchGameData,
    dispatchInput,
    inputByDart,
    whichDart,
  ]);

  return (
    <ClassicBottom>
      {DATA_BOTTOM.map((item) => {
        if (typeof item === "number") {
          return (
            <NUM_BUTTON
              activePlayer={activePlayer}
              animation={animation}
              theme={theme}
              key={item.value}
              value={item}
              inputMethod={inputMethod}
              typeMethod={typeMethod}
            />
          );
        } else {
          return (
            <FUNCTION_BUTTON
              activePlayer={activePlayer}
              animation={animation}
              theme={theme}
              key={item.value}
              value={item.value}
              action={item.action}
              icon={item.icon}
              bottom={true}
            />
          );
        }
      })}
    </ClassicBottom>
  );
};

export default CLASSIC_BOTTOM;
