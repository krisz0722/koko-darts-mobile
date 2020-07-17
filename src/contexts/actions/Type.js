import typeByDart from "./TypeInputMethodManual";
import typeByRound from "./TypeInputMethodDefault";

const type = (state, val) => {
  const {
    activePlayer,
    inputIndex,
    isInputByDart,
    scoreInputArray: { inputByDart, inputByDartArray, whichDart },
  } = state;
  const apKey = `${activePlayer}_DATA`;
  const apData = state[apKey];

  switch (isInputByDart) {
    case true:
      return typeByDart(
        state,
        val,
        apKey,
        apData,
        inputIndex,
        inputByDart,
        inputByDartArray,
        whichDart,
      );
    case false:
      return typeByRound(state, val, apKey, apData, inputIndex);
    default:
      return state;
  }
};

export default type;
