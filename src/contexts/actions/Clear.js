const clear = (state) => {
  const apKey = `${state.activePlayer}_DATA`;
  const apData = state[apKey];

  return {
    ...state,
    inputIndex: 0,

    scoreInputArray: {
      defaultInput: ["", "", ""],
      manualInput: ["", "", "", "", "", ""],
    },
    isInputManual: false,
    [apKey]: {
      ...apData,
      score: state.isInputManual
        ? apData.score + apData.lastScore
        : apData.score,
    },
  };
};

export default clear;
