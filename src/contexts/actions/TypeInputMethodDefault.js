const typeByRound = (state, val, apKey, apData, inputIndex) => {
  const {
    scoreInputArray: { inputByRound },
  } = state;

  if (inputIndex < 3) {
    inputByRound[inputIndex] = val;
  }

  const typedScore = parseInt(inputByRound.join(""));

  // alert("default");
  return {
    ...state,
    isInputByDart: false,
    inputIndex: inputIndex + 1,
    scoreInputArray: {
      inputByRound,
      inputByDart: {
        "1": ["", ""],
        "2": ["", ""],
        "3": ["", ""],
      },
    },
    [apKey]: {
      ...apData,
      lastScore: typedScore,
    },
    scoreToSubmit: typedScore,
  };
};

export default typeByRound;
