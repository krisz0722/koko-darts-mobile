export const changeInput = (state) => {
  const {
    scoreInputArray: { manualInput },
    isInputManual,
    scoreToSubmit,
    activePlayer,
  } = state;

  const apKey = `${activePlayer}_DATA`;
  const apData = state[apKey];
  let { score } = apData;
  const isInvalid = /INVALID/.test(manualInput);

  score = isInputManual && !isInvalid ? score + scoreToSubmit : score;
  const lastScore = isInputManual && !isInvalid ? 0 : scoreToSubmit;

  return {
    ...state,
    isInputManual: !state.isInputManual,
    inputIndex: 0,
    scoreToSubmit: 0,
    scoreInputArray: {
      defaultInput: ["", "", ""],
      manualInput: ["", "", "", "", "", ""],
    },
    [apKey]: {
      ...apData,
      score,
      lastScore,
    },
  };
};
