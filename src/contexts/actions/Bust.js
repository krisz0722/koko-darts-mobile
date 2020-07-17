import submitUpdateScore from "./SubmitUpdateScore";

const bust = (state) => {
  const { activePlayer } = state;
  const apKey = `${activePlayer}_DATA`;
  const apData = state[apKey];
  const newScore = apData.score;

  return submitUpdateScore(state, apKey, apData, 0, newScore, "BUST", 1);
};

export default bust;
