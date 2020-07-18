import { SCORINGDARTS } from "calc/const";
const typeNextDart = (state) => {
  let { activePlayer, inputByDart, whichDart, inputByDartArray } = state;

  const apKey = activePlayer + "_DATA";
  const apData = state[apKey];
  const score = apData.score;

  const updateInputDisplay = (dart) => {
    switch (dart) {
      case first:
        inputByDartArray[0] = 0;
        break;
      case second:
        inputByDartArray[2] = 0;
        break;
      case third:
        inputByDartArray[5] = 0;
        break;
    }
  };

  const dartValue = (dart, which) => {
    if (dart[0] === "") {
      if (whichDart === which) {
        updateInputDisplay(dart);
      }
      return 0;
    } else if (dart[1] === "") {
      return dart[0];
    } else {
      return parseInt(dart.join(""));
    }
  };

  let { first, second, third } = inputByDart;

  first = dartValue(first, 1);
  second = dartValue(second, 2);
  third = dartValue(third, 3);

  const typedScore = [first, second, third];

  const check = (input) => SCORINGDARTS.every((item) => item.value !== input);
  const invalidScore = typedScore.find(
    (input) => check(input) || input > score,
  );

  const resetScore = () => {
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
      isInputByDart: false,
      inputIndex: 0,
      inputByRound: ["INVALID SCORE"],
      inputByDartArray: ["", "", "", "", "", ""],
      inputByDart: {
        first: ["", ""],
        second: ["", ""],
        third: ["", ""],
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
      inputByDartArray,
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
