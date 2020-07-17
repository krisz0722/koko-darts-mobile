const typeByRound = (state, val) => {
  const { inputIndex, inputByRound, activePlayer } = state;

  const apKey = activePlayer["+DATA"];
  const apData = state[apKey];

  console.log(inputIndex);

  if (inputIndex < 3) {
    inputByRound[inputIndex] = val;
  }

  const typedScore = parseInt(inputByRound.join(""));

  return {
    ...state,
    isInputByDart: false,
    inputIndex: inputIndex + 1,
    inputByRound,
    inputByDart: {
      first: [],
      second: [],
      third: [],
    },
    [apKey]: {
      ...apData,
      lastScore: typedScore,
    },
    scoreToSubmit: typedScore,
  };
};

export default typeByRound;
