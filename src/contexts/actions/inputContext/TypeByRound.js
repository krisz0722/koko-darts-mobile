const typeByRound = (state, value) => {
  const { inputIndex, inputByRound } = state;

  if (inputIndex < 3) {
    inputByRound[inputIndex] = value;
    return {
      ...state,
      inputByRound,
      inputIndex: inputIndex + 1,
    };
  } else {
    return state;
  }
};

export default typeByRound;
