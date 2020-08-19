const finishMatch = (state) => {
  return {
    ...state,
    isMatchOver: false,
    status: "finished",
  };
};

export default finishMatch;
