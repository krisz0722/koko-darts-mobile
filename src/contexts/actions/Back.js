import submitUpdateScore from "./SubmitUpdateScore";

const back = (state, inapKey, inapData) => {
  const { canGoBack, score, lastScore } = inapData;
  const isValid = score && canGoBack;

  const scoreToSubmit = lastScore === "BUST" ? 0 : lastScore;
  const newScore = score + scoreToSubmit;

  switch (isValid) {
    case false:
      return {
        ...state,
        scoreInputArray: {
          defaultInput: ["CAN'T GO BACK!"],
          manualInput: ["CAN'T GO BACK!"],
        },
      };
    default:
      return submitUpdateScore(
        state,
        inapKey,
        inapData,
        scoreToSubmit,
        newScore,
        "BACK",
        -1,
      );
  }
};

export default back;
