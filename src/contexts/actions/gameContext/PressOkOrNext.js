import nextValidation from "../inputContext/nextValidation";
import { VALIDSCORES } from "../../../calc/scores";

const dispatchOkOrNext = (
  gameData,
  inputContext,
  dispatchGameData,
  dispatchInput,
) => {
  const { activePlayer } = gameData;
  const playerKey = activePlayer + "_DATA";
  const playerDATA = gameData[playerKey];
  const { inputByRound, inputByDart, inputMethod, whichDart } = inputContext;

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
      if (scoreToSubmit === playerScore) {
        dispatchInput({ type: "CHANGE_INPUT" });
        dispatchGameData({
          type: "SUBMIT",
          playerKey,
          value: first + second + third,
          method: "SUBMIT",
          byDartScore: true,
        });
      } else {
        dispatchGameData({ type: "UPDATE_BY_DART", scoreToSubmit, newScore });
      }
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
    } else {
      dispatchInput({ type: "INVALID", inputMethod });
    }
  }
};

export default dispatchOkOrNext;
