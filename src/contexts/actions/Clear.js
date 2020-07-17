const clear = (state) => {
  const apKey = `${state.activePlayer}_DATA`;
  const apData = state[apKey];

  const { inputByDart, isInputByDart, whichDart } = state;

  let score = apData.score;

  let { first, second, third } = inputByDart;

  const clearScore = () => {
    const isInvalid = /INVALID/.test(inputByDart.first);

    if (isInputByDart && !isInvalid) {
      first = parseInt(first.join(""));
      second = parseInt(second.join(""));
      third = parseInt(third.join(""));

      switch (whichDart) {
        case 1:
          return score;
        case 2:
          return score + first;
        case 3:
          return score + first + second;
        default:
          alert("ERROR");
          break;
      }
    } else {
      return score;
    }
  };

  return {
    ...state,
    inputIndex: 0,
    inputByRound: ["", "", ""],
    inputByDartArray: ["", "", "", "", "", ""],
    inputByDart: {
      first: [],
      second: [],
      third: [],
    },
    isInputByDart: false,
    [apKey]: {
      ...apData,
      score: clearScore(),
    },
  };
};

export default clear;
