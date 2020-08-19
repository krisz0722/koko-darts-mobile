const UpdateByDart = (state, scoreToSubmit, newScore) => {
  const apKey = state.activePlayer + "_DATA";
  return {
    ...state,
    [apKey]: {
      ...state[apKey],
      score: newScore,
    },
  };
};

export default UpdateByDart;
