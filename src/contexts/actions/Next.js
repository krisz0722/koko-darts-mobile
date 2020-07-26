import { SCORINGDARTS } from "../../calc/const";
import { useContext } from "react";
import { GameContext } from "../GameContext";

const Next = (state, score, initialState) => {
  const { dispatchGameData } = useContext(GameContext);

  const { whichDart, inputByDart } = state;
  let { first, second, third } = inputByDart;

  const convert = (value) =>
    typeof value === "object"
      ? value.every((item) => item === "")
        ? 0
        : value
      : value;

  first = convert(first);
  second = convert(second);
  third = convert(third);

  const whichScore = () => {
    switch (whichDart) {
      case 1:
        return first;
      case 2:
        return second;
      case 3:
        return third;
    }
  };

  const scoreToSubmit = whichScore();
  const check = () =>
    SCORINGDARTS.find((item) => scoreToSubmit === item.value) !== undefined;

  const newScore = score - scoreToSubmit;

  const checkNewScore = () => {
    return newScore !== 1 && newScore >= 0;
  };

  console.log("NEWSCORE", newScore);
  console.log("CHECK", check(0));
  console.log("CHECKNEWSOCRE", checkNewScore());
  const isValid = () => checkNewScore() && check();

  if (isValid()) {
    const newIndex = () => {
      switch (whichDart) {
        case 1:
          return 2;
        case 2:
          return 4;
        case 3:
          return 1;
      }
    };
    dispatchGameData({ type: "UPDATE_BY_DART", scoreToSubmit, newScore });
    return {
      ...state,
      inputByDart: {
        first,
        second,
        third,
      },
      whichDart: whichDart + 1,
      inputIndex: newIndex(),
    };
  } else {
    const whichScore = () => {
      switch (whichDart) {
        case 1:
          return 0;
        case 2:
          return first;
        case 3:
          return first + second;
      }
    };
    const scoreToSubmit = whichScore();
    const newScore = score + scoreToSubmit;
    dispatchGameData({ type: "UPDATE_BY_DART", scoreToSubmit, newScore });
    return {
      ...initialState,
      inputArray: ["INVALID"],
      inputByRound: ["INVALID"],
    };
  }
};

export default Next;
