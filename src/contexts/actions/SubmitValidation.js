import { VALIDSCORES } from "calc/scores";
import submitUpdateScore from "./SubmitUpdateScore";

const submitValidation = (state, apKey, apData) => {
  const {
    isInputByDart,
    scoreInputArray,
    scoreInputArray: { inputByDart, inputByRound, whichDart },
  } = state;

  let { scoreToSubmit } = state;

  console.log("scoreToSubmit", scoreToSubmit);
  console.log("inputByDart", inputByDart);
  console.log("whichDart", whichDart);

  scoreToSubmit = isInputByDart
    ? inputByDart[whichDart.toString()].join("")
    : scoreToSubmit;

  const newScore = isInputByDart ? apData.score : apData.score - scoreToSubmit;
  const isEmpty = !isInputByDart && inputByRound[0] === "";
  const isValid =
    VALIDSCORES.indexOf(scoreToSubmit) !== -1 && !/INVALID/.test(inputByDart);
  const isNewScoreValid = newScore !== 1 && newScore >= 0;

  //TODO

  const proceed = !isEmpty && isValid && isNewScoreValid;

  console.log(
    "isempty",
    !isEmpty,
    "isValid",
    isValid,
    "isNewScoreValid",
    isNewScoreValid,
  );

  switch (proceed) {
    case false:
      return {
        ...state,
        scoreToSubmit: "",
        inputIndex: 0,
        scoreInputArray: {
          inputByRound: ["INVALID SCORE"],
          inputByDart: ["INVALID SCORE"],
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
