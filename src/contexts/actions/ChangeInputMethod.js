export const changeInput = (state) => {
  const { inputByDart, isInputByDart, scoreToSubmit, activePlayer } = state;

  const { first, second, third } = inputByDart;

  const apKey = `${activePlayer}_DATA`;
  const apData = state[apKey];
  let { score } = apData;
  const isInvalid =
    /INVALID/.test(first) && /INVALID/.test(second) && /INVALID/.test(third);

  score = isInputByDart && !isInvalid ? score + scoreToSubmit : score;

  return {
    ...state,
    isInputByDart: !state.isInputByDart,
    inputIndex: 0,
    scoreToSubmit: 0,
    inputByRound: ["", "", ""],
    inputByDartArray: ["", "", "", "", "", ""],
    inputByDart: {
      first: ["", ""],
      second: ["", ""],
      third: ["", ""],
    },
    whichDart: 1,
    [apKey]: {
      ...apData,
      score,
    },
  };
};
