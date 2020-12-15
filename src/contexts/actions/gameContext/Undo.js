import submitUpdateScore from "./SubmitUpdateScore";

const undo = (state, num2) => {
  const { inactivePlayer } = state;
  const inapKey = `${inactivePlayer}_DATA`;
  const inapData = state[inapKey];
  const { canGoBack, score, lastScore } = inapData;

  const isValid = score && lastScore !== "" && canGoBack;
  const scoreToSubmit = lastScore === "BUST" ? 0 : lastScore;

  switch (isValid) {
    case false:
      return {
        ...state,
        inputByRound: ["CAN'T GO BACK!"],
        inputByDart: ["CAN'T GO BACK!"],
      };
    default:
      return submitUpdateScore(state, inapKey, scoreToSubmit, "UNDO", -1, num2);
  }
};

export default undo;
