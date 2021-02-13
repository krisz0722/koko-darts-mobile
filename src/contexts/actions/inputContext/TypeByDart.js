const typeByDart = (state, value) => {
  const { whichDart, inputArray, inputByDart, inputIndex } = state;

  switch (whichDart) {
    case 1:
      if (inputIndex < 2) {
        inputArray[inputIndex] = value;
        return {
          ...state,
          inputArray,
          inputIndex: inputIndex + 1,
          inputByDart: {
            ...inputByDart,
            first:
              inputArray[1] === ""
                ? parseInt(inputArray[0])
                : parseInt(inputArray.slice(0, 2).join("")),
          },
        };
      } else {
        return state;
      }
    case 2:
      if (inputIndex < 4) {
        inputArray[inputIndex] = value;
        return {
          ...state,
          inputArray,
          inputIndex: inputIndex + 1,
          inputByDart: {
            ...inputByDart,
            second:
              inputArray[3] === ""
                ? parseInt(inputArray[2])
                : parseInt(inputArray.slice(2, 4).join("")),
          },
        };
      } else {
        return state;
      }
    case 3:
      if (inputIndex < 6) {
        inputArray[inputIndex] = value;
        return {
          ...state,
          inputArray,
          inputIndex: inputIndex + 1,
          inputByDart: {
            ...inputByDart,
            third:
              inputArray[5] === ""
                ? parseInt(inputArray[4])
                : parseInt(inputArray.slice(4, 6).join("")),
          },
        };
      } else {
        return state;
      }
  }
};

export default typeByDart;
