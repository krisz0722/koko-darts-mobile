import typeInputMethodManual from "./TypeInputMethodManual";
import typeInputMethodDefault from "./TypeInputMethodDefault";

const type = (state, val) => {
  const {
    activePlayer,
    inputIndex,
    isInputManual,
    scoreInputArray: { manualInput },
  } = state;
  const apKey = `${activePlayer}_DATA`;
  const apData = state[apKey];
  const inputMethodType =
    isInputManual && manualInput.length !== 1
      ? inputIndex < 6
        ? "MANUAL"
        : "NO_ACTION"
      : "DEFAULT";

  switch (inputMethodType) {
    case "MANUAL":
      return typeInputMethodManual(
        state,
        val,
        apKey,
        apData,
        inputIndex,
        manualInput,
      );
    case "DEFAULT":
      return typeInputMethodDefault(state, val, apKey, apData, inputIndex);
    case "NO_ACTION":
      return state;
    default:
      return null;
  }
};

export default type;
