import submitUpdateScore from "./SubmitUpdateScore";

const back = (state) => {
  const { inactivePlayer } = state;
  const inapKey = `${inactivePlayer}_DATA`;
  const inapData = state[inapKey];
  const { canGoBack, score, lastScore } = inapData;

  const isValid = score && lastScore !== "" && canGoBack;
  const scoreToSubmit = lastScore === "BUST" ? 0 : lastScore;
  const newScore = score + scoreToSubmit;

  switch (isValid) {
    case false:
      return {
        ...state,
        inputByRound: ["CAN'T GO BACK!"],
        inputByDart: ["CAN'T GO BACK!"],
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
