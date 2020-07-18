import typeByDart from "./TypeByDart";
import typeByRound from "./TypeByRound";

const type = (state, val) => {
  const { isInputByDart } = state;

  switch (isInputByDart) {
    case true:
      return typeByDart(state, val);
    case false:
      return typeByRound(state, val);
    default:
      return state;
  }
};

export default type;
