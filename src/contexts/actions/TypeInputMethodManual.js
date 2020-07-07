import typeUpdateScore from "./TypeUpdateScore";

const typeInputMethodManual = (
  state,
  val,
  apKey,
  apData,
  inputIndex,
  manualInput,
) => {
  manualInput[inputIndex] = val;
  inputIndex++;

  if (inputIndex % 2 !== 0) {
    return {
      ...state,
      inputIndex: inputIndex,
      scoreInputArray: {
        defaultInput: ["", "", ""],
        manualInput: manualInput,
      },
    };
  }
  return typeUpdateScore(state, manualInput, apKey, apData, inputIndex);
};

export default typeInputMethodManual;
