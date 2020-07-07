const changeStartingScore = (state, val) => ({
  ...state,
  startingScore: val,
  p1_DATA: {
    ...state.p1_DATA,
    score: val,
  },
  p2_DATA: {
    ...state.p2_DATA,
    score: val,
  },
});

export default changeStartingScore;
