import { CHECKOUTS } from "calc/scores";

const submitUpdateScore = (state, playerKey, scoreToSubmit, type, num) => {
  const playerData = state[playerKey];

  let {
    score,
    tsLeg,
    tsMatch,
    norLeg,
    norMatch,
    tsFirstNine,
    tsScoring,
    norFirstNine,
    norScoring,
    dartsUsedInLeg,
    numOfCoDarts,
  } = playerData;

  const prevScore = score + scoreToSubmit;

  const newScore =
    type === "UNDO"
      ? score + scoreToSubmit
      : type === "SUBMIT"
      ? score - scoreToSubmit
      : score;

  const wasOnCheckout = CHECKOUTS.some((co) => co.value === prevScore);
  const prevScoreNumOfDarts = wasOnCheckout
    ? CHECKOUTS.find((co) => co.value === prevScore).checkouts[0].nod
    : 0;

  const onCheckout = CHECKOUTS.some((co) => co.value === newScore);

  tsLeg += scoreToSubmit * num;
  tsMatch += scoreToSubmit * num;
  norLeg += num;
  norMatch += num;

  tsFirstNine = norLeg <= 3 ? tsFirstNine + scoreToSubmit * num : tsFirstNine;
  tsScoring = !wasOnCheckout ? tsScoring + scoreToSubmit * num : tsScoring;
  norFirstNine = norLeg <= 3 ? norFirstNine + num : norFirstNine;
  norScoring = !wasOnCheckout ? norScoring + num : norScoring;

  const avgLeg = norLeg === 0 ? 0 : (tsLeg / norLeg).toFixed(1);
  const avgMatch = norMatch === 0 ? 0 : (tsMatch / norMatch).toFixed(1);
  const avgFirstNine =
    norFirstNine === 0 ? 0 : (tsFirstNine / norFirstNine).toFixed(1);
  const avgScoring = norScoring === 0 ? 0 : (tsScoring / norScoring).toFixed(1);

  const isLegOver = newScore === 0;
  const winner = isLegOver ? state.activePlayer : null;

  const missedDoubles = () => {
    switch (prevScoreNumOfDarts) {
      case 3:
        return 0;
      case 2:
        return 2;
      case 1:
        return 3;
      default:
        return 0;
    }
  };

  dartsUsedInLeg = !isLegOver ? norLeg * 3 : dartsUsedInLeg;
  numOfCoDarts = !isLegOver ? numOfCoDarts + missedDoubles() : numOfCoDarts;

  const lastScore = (type) => {
    switch (type) {
      case "BUST":
        return "BUST";
      case "UNDO":
        return 0;
      case "SUBMIT":
        return scoreToSubmit;
      case "UPDATE":
        return scoreToSubmit;
      default:
        return null;
    }
  };

  //TS = total score
  // NOR = num of rounds

  return {
    ...state,
    [playerKey]: {
      ...playerData,
      tsLeg,
      tsMatch,
      tsFirstNine,
      tsScoring,
      norLeg,
      norMatch,
      norFirstNine,
      norScoring,
      avgLeg,
      avgMatch,
      avgFirstNine,
      avgScoring,
      dartsUsedInLeg,
      onCheckout,
      numOfCoDarts,
      score: newScore,
      lastScore: lastScore(type),
      canGoBack: type !== "UNDO",
      60:
        scoreToSubmit >= 60 && scoreToSubmit < 80
          ? playerData["60"] + num
          : playerData["60"],
      80:
        scoreToSubmit >= 80 && scoreToSubmit < 100
          ? playerData["80"] + num
          : playerData["80"],
      100:
        scoreToSubmit >= 100 && scoreToSubmit < 140
          ? playerData["100"] + num
          : playerData["100"],
      140:
        scoreToSubmit >= 140 && scoreToSubmit < 180
          ? playerData["140"] + num
          : playerData["140"],
      180: scoreToSubmit === 180 ? playerData["180"] + num : playerData["180"],
    },
    scoreToSubmit: 0,
    activePlayer: state.inactivePlayer,
    inactivePlayer: state.activePlayer,
    isLegOver,
    winner,
  };
};

export default submitUpdateScore;
