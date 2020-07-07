import { VALIDSCORES } from "calc/scores";
import submitUpdateScore from "./SubmitUpdateScore";

const submitValidation = (state, apKey, apData) => {
  const {
    isInputManual,
    scoreToSubmit,
    scoreInputArray: { manualInput, defaultInput },
  } = state;

  const newScore = isInputManual ? apData.score : apData.score - scoreToSubmit;
  const isEmpty = isInputManual
    ? manualInput[0] === ""
    : defaultInput[0] === "";
  const isValid =
    VALIDSCORES.indexOf(scoreToSubmit) !== -1 && !/INVALID/.test(manualInput);
  const isNewScoreValid = newScore !== 1 && newScore >= 0;

  const proceed = !isEmpty && isValid && isNewScoreValid;

  switch (proceed) {
    case false:
      return {
        ...state,
        scoreToSubmit: "",
        inputIndex: 0,
        scoreInputArray: {
          defaultInput: ["INVALID SCORE"],
          manualInput: ["INVALID SCORE"],
        },
      };
    default:
      return submitUpdateScore(
        state,
        apKey,
        apData,
        scoreToSubmit,
        newScore,
        "OK",
        1,
      );
  }
};

export default submitValidation;
