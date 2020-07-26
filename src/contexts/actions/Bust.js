import submitUpdateScore from "./SubmitUpdateScore";

const bust = (state) => {
  const { activePlayer } = state;
  const apKey = `${activePlayer}_DATA`;

  return submitUpdateScore(state, apKey, 0, "BUST", 1);
};

export default bust;
