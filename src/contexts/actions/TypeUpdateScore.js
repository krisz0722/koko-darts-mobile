import { SCORINGDARTS } from "calc/const";

const typeUpdateScore = (state, inputByDart, apKey, apData, inputIndex) => {
  const first = parseInt(inputByDart.slice(0, 2).join(""));
  const second = parseInt(inputByDart.slice(2, 4).join(""));
  const third = parseInt(inputByDart.slice(4, 6).join(""));

  const typedScore = [first, second, third];
  const check = (input) => SCORINGDARTS.some((score) => score.value === input);
  const invalidScore = typedScore.find(
    (input) => !check(input) || input > apData.score,
  );

  const resetScore = (invalidScore) => {
    switch (invalidScore) {
      case first:
        return apData.score;
      case second:
        return apData.score + first;
      case third:
        return apData.score + first + second;
      default:
        return null;
    }
  };

  const updateRemainder = () => {
    switch (inputIndex) {
      case 2:
        return apData.score - first;
      case 4:
        return apData.score - second;
      default:
        return apData.score - third;
    }
  };
  const scoreToSubmit = () => {
    if (isNaN(first)) {
      return 0;
    }
    if (isNaN(second)) {
      return first;
    }
    if (isNaN(third)) {
      return first + second;
    }
    return first + second + third;
  };

  if (invalidScore) {
    return {
      ...state,
      inputIndex: 0,
      scoreInputArray: {
        inputByRound: ["", "", ""],
        inputByDart: [`${invalidScore} IS INVALID`],
      },
      [apKey]: {
        ...apData,
        score: resetScore(invalidScore),
      },
    };
  }
  return {
    ...state,
    inputIndex: inputIndex,
    [apKey]: {
      ...apData,
      score: updateRemainder(),
      // lastScore: scoreToSubmit()
    },
    scoreToSubmit: scoreToSubmit(),
  };
};

export default typeUpdateScore;
