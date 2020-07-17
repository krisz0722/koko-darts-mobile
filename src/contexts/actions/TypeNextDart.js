import { SCORINGDARTS } from "calc/const";
const typeNextDart = (state) => {
  let { activePlayer, inputByDart, whichDart } = state;

  const apKey = activePlayer + "_DATA";
  const apData = state[apKey];
  const score = apData.score;

  let { first, second, third } = inputByDart;

  first = parseInt(first.join(""));
  second = parseInt(second.join(""));
  third = parseInt(third.join(""));

  const typedScore = [first, second, third];

  const check = (input) => SCORINGDARTS.some((item) => item.value === input);
  const invalidScore = typedScore.find(
    (input) => !check(input) || input > score,
  );

  const resetScore = (invalidScore) => {
    switch (invalidScore) {
      case first:
        return score;
      case second:
        return score + first;
      case third:
        return score + first + second;
      default:
        return null;
    }
  };

  const updateRemainder = () => {
    switch (whichDart) {
      case 1:
        return score - first;
      case 2:
        return score - second;
      case 3:
        return score - third;
      default:
        alert("ERROR");
        break;
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
      inputByRound: ["", "", ""],
      inputByDartArray: ["", "", "", "", "", ""],
      inputByDart: {
        first: ["INVALID"],
      },
      whichDart: 1,
      [apKey]: {
        ...apData,
        score: resetScore(invalidScore),
      },
    };
  } else {
    state = {
      ...state,
      inputByDart,
      whichDart: whichDart + 1,
      inputIndex: whichDart + 1 === 2 ? 2 : 4,
      [apKey]: {
        ...apData,
        score: updateRemainder(),
      },
      scoreToSubmit: scoreToSubmit(),
    };
    if (whichDart !== 3) {
      return state;
    } else {
    }
  }
};

export default typeNextDart;
