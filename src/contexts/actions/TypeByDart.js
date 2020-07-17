const typeByDart = (state, val) => {
  let { whichDart, inputByDartArray, inputIndex } = state;

  const inputByDart = {
    first: inputByDartArray.slice(0, 2),
    second: inputByDartArray.slice(2, 4),
    third: inputByDartArray.slice(4, 6),
  };

  switch (whichDart) {
    case 1:
      if (inputIndex < 2) {
        inputByDartArray[inputIndex] = val;
        inputIndex++;
      }
      break;
    case 2:
      if (inputIndex < 4) {
        inputByDartArray[inputIndex] = val;
        inputIndex++;
      }
      break;
    case 3:
      if (inputIndex < 6) {
        inputByDartArray[inputIndex] = val;
        inputIndex++;
      }
      break;
    default:
      break;
  }

  return {
    ...state,
    inputIndex: inputIndex,
    inputByRound: ["", "", ""],
    inputByDart,
    inputByDartArray,
  };
};

export default typeByDart;
