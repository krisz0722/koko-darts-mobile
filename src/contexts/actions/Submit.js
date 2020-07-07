import submitUpdateScore from "./SubmitUpdateScore";
import clear from "./Clear";
import back from "./Back";
import submitValidation from "./SubmitValidation";

const submit = (state, value) => {
  const { activePlayer, inactivePlayer } = state;
  const apKey = `${activePlayer}_DATA`;
  const apData = state[apKey];
  const inapKey = `${inactivePlayer}_DATA`;
  const inapData = state[inapKey];
  const newScore = apData.score;

  switch (value) {
    case "BUST":
      return submitUpdateScore(state, apKey, apData, 0, newScore, "BUST", 1);
    case "BACK":
      return back(state, inapKey, inapData);
    case "CLEAR":
      return clear(state);
    default:
      return submitValidation(state, apKey, apData);
  }
};

export default submit;
