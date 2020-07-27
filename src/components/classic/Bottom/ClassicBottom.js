import React, { useContext, useCallback, useEffect } from "react";
import { Animated } from "react-native";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { FlexRow } from "../../../styles/css_mixins";
import NUM_BUTTON from "../../buttons/NumButton";
import FUNCTION_BUTTON from "../../buttons/FunctionButton";
import { InputContext } from "../../../contexts/InputContext";
import { GameContext } from "../../../contexts/GameContext";
import { VALIDSCORES } from "../../../calc/scores";
import { useNavigation } from "@react-navigation/native";
import nextValidation from "../../../contexts/actions/nextValidation";

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
  const navigation = useNavigation();

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
      if (inputMethod === "byDart") {
        const apKey = gameData.activePlayer + "_DATA";
        const apData = gameData[apKey];
        const apScore = apData.score;
        const { first, second } = inputByDart;

        const newScore = () => {
          switch (whichDart) {
            case 1:
              return apScore;
            case 2:
              return apScore + first;
            case 3:
              return apScore + first + second;
          }
        };
        dispatchGameData({
          type: "UPDATE_BY_DART",
          scoreToSubmit: 0,
          newScore: newScore(),
        });
      }
      dispatchInput({ type: "CLEAR_BY_DART" });
    } else {
      dispatchGameData({ type: "UNDO" });
    }
  };

  // console.log("PLAYER SCORE", playerDATA.score);

  const dispatchOkOrNext = () => {
    const playerScore = playerDATA.score;
    if (inputMethod === "byDart") {
      const validationResult = nextValidation(
        inputByDart,
        whichDart,
        playerScore,
      );

      const {
        valid,
        scoreToSubmit,
        scoreToSubmitWhenInvalid,
        first,
        second,
        third,
        prevScore,
        newScore,
        newIndex,
      } = validationResult;

      if (valid) {
        dispatchInput({
          type: "NEXT",
          first,
          second,
          third,
          newIndex,
        });

        dispatchGameData({ type: "UPDATE_BY_DART", scoreToSubmit, newScore });
      } else {
        dispatchInput({
          type: "INVALID",
          inputMethod,
        });

        dispatchGameData({
          type: "UPDATE_BY_DART",
          scoreToSubmitWhenInvalid,
          newScore: prevScore,
        });
      }
    } else {
      const scoreToSubmit = parseInt(inputByRound.join(""));
      const newScore = playerScore - scoreToSubmit;
      const isValid =
        VALIDSCORES.indexOf(scoreToSubmit) !== -1 &&
        newScore >= 0 &&
        newScore !== 1;
      if (isValid) {
        dispatchGameData({
          type: "SUBMIT",
          playerKey,
          value: scoreToSubmit,
          method: "SUBMIT",
        });
        dispatchInput({ type: "SET_DEFAULT" });
        if (playerScore === scoreToSubmit) {
          navigation.navigate("legisfinished");
        }
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
