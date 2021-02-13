import React from "react";
import ClearByDart from "./ClearByDart";

const dispatchUndoOrClear = (
  gameData,
  inputContext,
  dispatchGameData,
  dispatchInput,
) => {
  const { inactivePlayer } = gameData;
  const canGoBack = gameData[inactivePlayer + "_DATA"].canGoBack;

  const { inputByRound, inputByDart } = inputContext;

  const backOrClear =
    inputByRound[0] === "" && inputByDart.first[0] === "" && canGoBack
      ? "UNDO"
      : "CLEAR";

  if (backOrClear === "CLEAR") {
    const newScore = ClearByDart(gameData, inputContext);
    dispatchInput({ type: "RESET_INPUT" });
    dispatchGameData({
      type: "UPDATE_BY_DART",
      scoreToSubmit: 0,
      newScore,
    });
  } else {
    dispatchGameData({ type: "UNDO" });
  }
};

export default dispatchUndoOrClear;
