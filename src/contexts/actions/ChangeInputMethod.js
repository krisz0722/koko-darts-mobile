export const changeInput = (state, inputMethod) => {
  const method = inputMethod === "byRound" ? "byDart" : "byRound";

  return {
    ...state,
    inputMethod: method,
  };
};

export default changeInput;
