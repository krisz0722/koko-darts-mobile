import { CHECKOUTS } from "calc/scores";

const submitUpdateScore = (
  state,
  playerKey,
  playerData,
  scoreToSubmit,
  newScore,
  type,
  num,
) => {
  let {
    score,
    legTotalScore,
    matchTotalScore,
    numOfRoundsInLeg,
    numOfRoundsInMatch,
    firstNineDartTotalScore,
    scoringDartsTotalScore,
    numOfRoundsFirstNineDart,
    numOfRoundsScoringDarts,
    dartsUsedInLeg,
    numOfCoDarts,
  } = playerData;
  const prevScore = score;
  const wasOnCheckout = CHECKOUTS.some((co) => co.value === prevScore);
  const prevScoreNumOfDarts = wasOnCheckout
    ? CHECKOUTS.find((co) => co.value === prevScore).checkouts[0].nod
    : 0;
  const isOnCheckout = CHECKOUTS.some((co) => co.value === newScore);

  legTotalScore += scoreToSubmit * num;
  matchTotalScore += scoreToSubmit * num;
  numOfRoundsInLeg += num;
  numOfRoundsInMatch += num;

  firstNineDartTotalScore =
    numOfRoundsInLeg <= 3
      ? firstNineDartTotalScore + scoreToSubmit * num
      : firstNineDartTotalScore;
  scoringDartsTotalScore = !wasOnCheckout
    ? scoringDartsTotalScore + scoreToSubmit * num
    : scoringDartsTotalScore;
  numOfRoundsFirstNineDart =
    numOfRoundsInLeg <= 3
      ? numOfRoundsFirstNineDart + num
      : numOfRoundsFirstNineDart;
  numOfRoundsScoringDarts = !wasOnCheckout
    ? numOfRoundsScoringDarts + num
    : numOfRoundsScoringDarts;

  const legAverage =
    numOfRoundsInLeg === 0 ? 0 : legTotalScore / numOfRoundsInLeg;
  const matchAverage =
    numOfRoundsInMatch === 0 ? 0 : matchTotalScore / numOfRoundsInMatch;
  const firstNineDartAverage =
    numOfRoundsFirstNineDart === 0
      ? 0
      : firstNineDartTotalScore / numOfRoundsFirstNineDart;
  const scoringDartsAverage =
    numOfRoundsScoringDarts === 0
      ? 0
      : scoringDartsTotalScore / numOfRoundsScoringDarts;

  const isLegOver = newScore === 0;

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

  dartsUsedInLeg = !isLegOver ? numOfRoundsInLeg * 3 : dartsUsedInLeg;
  numOfCoDarts = !isLegOver ? numOfCoDarts + missedDoubles() : numOfCoDarts;

  const lastScore = (type) => {
    switch (type) {
      case "BUST":
        return "BUST";
      case "BACK":
        return 0;
      case "OK":
        return scoreToSubmit;
      default:
        return null;
    }
  };

  return {
    ...state,
    [playerKey]: {
      ...playerData,
      lastScore: lastScore(type),
      score: newScore,
      legTotalScore: legTotalScore,
      matchTotalScore: matchTotalScore,
      firstNineDartTotalScore: firstNineDartTotalScore,
      scoringDartsTotalScore: scoringDartsTotalScore,
      numOfRoundsInLeg: numOfRoundsInLeg,
      numOfRoundsInMatch: numOfRoundsInMatch,
      numOfRoundsFirstNineDart: numOfRoundsFirstNineDart,
      numOfRoundsScoringDarts: numOfRoundsScoringDarts,
      legAverage: legAverage.toFixed(1),
      matchAverage: matchAverage.toFixed(1),
      firstNineDartAverage: firstNineDartAverage.toFixed(1),
      scoringDartsAverage: scoringDartsAverage.toFixed(1),
      onCheckout: isOnCheckout,
      dartsUsedInLeg: dartsUsedInLeg,
      numOfCoDarts: numOfCoDarts,
      canGoBack: type !== "BACK",
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
    isInputManual: false,
    inputIndex: 0,
    scoreToSubmit: 0,
    activePlayer: state.inactivePlayer,
    inactivePlayer: state.activePlayer,
    scoreInputArray: {
      defaultInput: ["", "", ""],
      manualInput: ["", "", "", "", "", ""],
    },
    isLegOver: isLegOver,
  };
};

export default submitUpdateScore;
