import { SCORINGDARTS } from "../../calc/const";

const nextValidation = (inputByDart, whichDart, playerScore) => {
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

  const whichScoreWhenInvalid = () => {
    switch (whichDart) {
      case 1:
        return 0;
      case 2:
        return first;
      case 3:
        return first + second;
    }
  };

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

  const scoreToSubmit = whichScore();
  const scoreToSubmitWhenInvalid = whichScoreWhenInvalid();
  const newScore = playerScore - scoreToSubmit;

  const checkScoreToSubmit = () =>
    SCORINGDARTS.find((item) => scoreToSubmit === item.value) !== undefined;

  const checkNewScore = () => {
    return newScore !== 1 && newScore >= 0;
  };

  const valid = checkNewScore() && checkScoreToSubmit();

  return {
    valid,
    scoreToSubmit,
    scoreToSubmitWhenInvalid,
    first,
    second,
    third,
    prevScore: playerScore + scoreToSubmitWhenInvalid,
    newScore,
    newIndex: newIndex(),
  };
};

export default nextValidation;
