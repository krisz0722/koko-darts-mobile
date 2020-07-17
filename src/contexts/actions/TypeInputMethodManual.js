import typeUpdateScore from "./TypeUpdateScore";

const typeByDart = (
  state,
  val,
  apKey,
  apData,
  inputIndex,
  inputByDart,
  inputByDartArray,
  whichDart,
) => {
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

  inputByDart = {
    "1": inputByDartArray.slice(0, 2),
    "2": inputByDartArray.slice(2, 4),
    "3": inputByDartArray.slice(4, 6),
  };

  console.log("whichDart", whichDart);
  console.log("inputeindex", inputIndex);
  console.log("dartarray", inputByDartArray);
  console.log("inputvydart", inputByDart);

  return {
    ...state,
    inputIndex: inputIndex,
    scoreInputArray: {
      inputByRound: ["", "", ""],
      inputByDartArray,
      inputByDart,
      whichDart,
    },
  };
};
// return typeUpdateScore(state, inputByDart, apKey, apData, inputIndex);

export default typeByDart;
