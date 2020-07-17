import { VALIDSCORES } from "calc/scores";
import submitUpdateScore from "./SubmitUpdateScore";

const submitValidation = (state) => {
  const { activePlayer, scoreToSubmit, inputByRound } = state;

  const apKey = `${activePlayer}_DATA`;
  const apData = state[apKey];
  console.log("SCORETOSUMIT", scoreToSubmit);
  const newScore = apData.score - scoreToSubmit;
  const isEmpty = inputByRound[0] === "";
  const isValid = VALIDSCORES.indexOf(scoreToSubmit) !== -1;
  const isNewScoreValid = newScore !== 1 && newScore >= 0;

  const proceed = !isEmpty && isValid && isNewScoreValid;

  switch (proceed) {
    case false:
      return {
        ...state,
        scoreToSubmit: "",
        inputIndex: 0,
        inputByRound: ["INVALID SCORE"],
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
