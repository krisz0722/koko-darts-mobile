const finishMatch = (state, isRematch = false) => {
  return {
    ...state,
    isMatchOver: false,
    isRematch,
    status: "finished",
  };
};

export default finishMatch;
