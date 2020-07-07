const typeInputMethodDefault = (state, val, apKey, apData, inputIndex) => {
  const {
    scoreInputArray: { defaultInput },
  } = state;

  if (inputIndex < 3) {
    defaultInput[inputIndex] = val;
  }

  const typedScore = parseInt(defaultInput.join(""));

  return {
    ...state,
    isInputManual: false,
    inputIndex: inputIndex + 1,
    scoreInputArray: {
      defaultInput: defaultInput,
      manualInput: ["", "", "", "", "", ""],
    },
    [apKey]: {
      ...apData,
      lastScore: typedScore,
    },
    scoreToSubmit: typedScore,
  };
};

export default typeInputMethodDefault;
