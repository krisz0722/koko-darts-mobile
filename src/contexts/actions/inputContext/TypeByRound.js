const typeByRound = (state, value) => {
  const { inputArray, inputIndex, inputByRound } = state;

  const inputArray2 = /invalid/.test(inputArray)
    ? inputArray[inputIndex]
    : inputArray;

  if (inputIndex < 3) {
    inputByRound[inputIndex] = value;
    inputArray[inputIndex] = value;
    return {
      ...state,
      inputByRound,
      inputArray: inputArray2,
      inputIndex: inputIndex + 1,
    };
  } else {
    return state;
  }
};

export default typeByRound;
