import React, { useContext, useCallback, useEffect } from "react";
import NUM_BUTTON from "../../buttons/NumButton";
import FUNCTION_BUTTON from "../../buttons/FunctionButton";
import { InputContext } from "../../../contexts/InputContext";
import { GameContext } from "../../../contexts/GameContext";
import { ClassicBottom } from "./StyledClassicBottom";
import dispatchUndoOrClear from "../../../contexts/actions/gameContext/PressUndoOrClear";
import dispatchOkOrNext from "../../../contexts/actions/gameContext/PressOkOrNext";

const CLASSIC_BOTTOM = React.memo((props) => {
  const { animation, theme, activePlayer, inactivePlayer } = props;
  const {
    inputContext,
    inputContext: { inputMethod, inputByRound, inputByDart, whichDart },
    dispatchInput,
  } = useContext(InputContext);

  const { dispatchGameData, gameData } = useContext(GameContext);

  const playerKey = activePlayer + "_DATA";
  const canGoBack = gameData[inactivePlayer + "_DATA"].canGoBack;

  const backOrClear =
    inputByRound[0] === "" && inputByDart.first[0] === "" && canGoBack
      ? "UNDO"
      : "CLEAR";

  const okOrNext = inputMethod === "byDart" && whichDart !== 3 ? "NEXT" : "OK";

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
      action: () =>
        dispatchUndoOrClear(
          gameData,
          inputContext,
          dispatchGameData,
          dispatchInput,
        ),
      icon: backOrClear === "CLEAR" ? "clear" : "replay",
    },
    0,

    {
      value: okOrNext,
      action: () =>
        dispatchOkOrNext(
          gameData,
          inputContext,
          dispatchGameData,
          dispatchInput,
        ),
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
      {DATA_BOTTOM.map((item, i) => (
        <React.Fragment key={i}>
          {typeof item === "number" ? (
            <NUM_BUTTON
              activePlayer={activePlayer}
              animation={animation}
              theme={theme}
              value={item}
              inputMethod={inputMethod}
              typeMethod={typeMethod}
            />
          ) : (
            <FUNCTION_BUTTON
              activePlayer={activePlayer}
              animation={animation}
              theme={theme}
              value={item.value}
              action={item.action}
              icon={item.icon}
              bottom={true}
            />
          )}
        </React.Fragment>
      ))}
    </ClassicBottom>
  );
});

export default CLASSIC_BOTTOM;
