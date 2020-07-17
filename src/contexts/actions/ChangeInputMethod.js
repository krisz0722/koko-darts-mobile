export const changeInput = (state) => {
  const { inputByDart, isInputByDart, scoreToSubmit, activePlayer } = state;

  const apKey = `${activePlayer}_DATA`;
  const apData = state[apKey];
  let { score } = apData;
  const isInvalid = /INVALID/.test(inputByDart);

  score = isInputByDart && !isInvalid ? score + scoreToSubmit : score;
  const lastScore = isInputByDart && !isInvalid ? 0 : scoreToSubmit;

  return {
    ...state,
    isInputByDart: !state.isInputByDart,
    inputIndex: 0,
    scoreToSubmit: 0,
    inputByRound: ["", "", ""],
    inputByDartArray: ["", "", "", "", "", ""],
    inputByDart: {
      first: [],
      second: [],
      third: [],
    },
    whichDart: 1,
    [apKey]: {
      ...apData,
      score,
      lastScore,
    },
  };
};
