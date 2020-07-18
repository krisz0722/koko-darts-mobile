import { VALIDSCORES } from "calc/scores";
import submitUpdateScore from "./SubmitUpdateScore";

const submitValidation = (state) => {
  const { activePlayer, inputByRound, isInputByDart, inputByDart } = state;

  let { scoreToSubmit } = state;

  const apKey = `${activePlayer}_DATA`;
  const apData = state[apKey];

  const newScore = () => {
    const score = apData.score;
    if (isInputByDart) {
      const third = parseInt(inputByDart.third.join(""));
      if (third) {
        scoreToSubmit = scoreToSubmit + third;
        console.log(scoreToSubmit);
        return score - third;
      } else {
        return score;
      }
    } else {
      return score - scoreToSubmit;
    }
  };

  const score = newScore();

  const isEmpty = !isInputByDart ? inputByRound[0] === "" : false;
  const isValid = VALIDSCORES.indexOf(scoreToSubmit) !== -1;
  const isNewScoreValid = score !== 1 && score >= 0;

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
        newScore(),
        "OK",
        1,
      );
  }
};

export default submitValidation;
