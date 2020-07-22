import { VALIDSCORES } from "calc/scores";
import submitUpdateScore from "./SubmitUpdateScore";
import { SCORINGDARTS } from "../../calc/const";

const submitValidation = (state) => {
  const { activePlayer, inputByRound, isInputByDart, inputByDart } = state;
  const apKey = `${activePlayer}_DATA`;
  const apData = state[apKey];

  let score = apData.score;
  let { scoreToSubmit } = state;

  let { first, second, third } = inputByDart;

  const dartValue = (dart) => {
    if (dart[0] === "") {
      return 0;
    } else if (dart[1] === "") {
      return dart[0];
    } else {
      return parseInt(dart.join(""));
    }
  };

  first = dartValue(first, 1);
  second = dartValue(second, 2);
  third = dartValue(third, 3);

  const proceedDefault = () => {
    const newScore = score - scoreToSubmit;
    const isEmpty = !isInputByDart ? inputByRound[0] === "" : false;
    const isValid = VALIDSCORES.indexOf(scoreToSubmit) !== -1;
    const isNewScoreValid = newScore !== 1 && newScore >= 0;
    return !isEmpty && isValid && isNewScoreValid;
  };

  const proceedByDart = () => {
    const isThirdValid =
      SCORINGDARTS.find((item) => third === item.value) !== undefined;
    const newScore = score - third;
    const isNewScoreValid = newScore !== 1 && newScore >= 0;

    return isThirdValid && isNewScoreValid;
  };

  const newScoreDefault = (proceed) => {
    if (proceed) {
      return score - scoreToSubmit;
    }
    return score;
  };

  const newScoreByDart = (proceed) => {
    if (proceed) {
      return score - third;
    }
    return score + first + second;
  };

  const proceed = isInputByDart ? proceedByDart() : proceedDefault();

  const newScore = () =>
    isInputByDart ? newScoreByDart(proceed) : newScoreDefault(proceed);
  const newScoreToSubmit = isInputByDart
    ? scoreToSubmit + third
    : scoreToSubmit;

  switch (proceed) {
    case true:
      return submitUpdateScore(
        state,
        apKey,
        apData,
        newScoreToSubmit,
        newScore(),
        "OK",
        1,
      );
    case false:
      return {
        ...state,
        [apKey]: {
          ...apData,
          score: newScore(),
        },
        scoreToSubmit: "",
        inputIndex: 0,
        isInputByDart: false,
        inputByRound: ["INVALID SCORE"],
        inputByDart: {
          first: ["", ""],
          second: ["", ""],
          third: ["", ""],
        },
      };

    default:
      alert("ERROR");
      return null;
  }
};

export default submitValidation;
