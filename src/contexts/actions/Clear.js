const clear = (state) => {
  const apKey = `${state.activePlayer}_DATA`;
  const apData = state[apKey];

  return {
    ...state,
    inputIndex: 0,

    scoreInputArray: {
      inputByRound: ["", "", ""],
      inputByDart: {
        "1": ["", ""],
        "2": ["", ""],
        "3": ["", ""],
      },
    },
    isInputByDart: false,
    [apKey]: {
      ...apData,
      score: state.isInputByDart
        ? apData.score + apData.lastScore
        : apData.score,
    },
  };
};

export default clear;
