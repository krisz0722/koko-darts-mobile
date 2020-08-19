const finishLeg = (state, nodUsed, nodRequired, settings) => {
  const { activePlayer, inactivePlayer } = state;

  const { legOrSet, toWin, startingScore, legsPerSet } = settings;
  const apKey = `${activePlayer}_DATA`;
  const apData = state[apKey];

  const inapKey = `${inactivePlayer}_DATA`;
  const inapData = state[inapKey];
  let {
    legsWon,
    setsWon,
    dartsUsedInLeg,
    dartsUsedInMatch,
    bestLegByDartsUsed,
    avgLeg,
    avgMatch,
    norMatch,
    norLeg,
    tsMatch,
    tsLeg,
    bestAvgLeg,
    numOfCoDarts,
    lastScore,
    highestCheckout,
  } = inapData;

  legsWon += 1;
  setsWon = legsWon === legsPerSet ? setsWon + 1 : setsWon;
  numOfCoDarts = numOfCoDarts + nodUsed - nodRequired + 1;
  dartsUsedInLeg += nodUsed;
  avgMatch = tsMatch / ((dartsUsedInMatch + nodUsed) / 3);
  avgLeg = tsLeg / (dartsUsedInLeg / 3);
  bestLegByDartsUsed =
    dartsUsedInLeg < bestLegByDartsUsed || bestLegByDartsUsed === 0
      ? dartsUsedInLeg
      : bestLegByDartsUsed;
  bestAvgLeg = avgLeg > bestAvgLeg || bestAvgLeg === 0 ? avgLeg : bestAvgLeg;
  highestCheckout = lastScore > highestCheckout ? lastScore : highestCheckout;

  const doublePercentage = `${((legsWon / numOfCoDarts) * 100).toFixed(1)}%`;

  const isMatchOver = () => {
    switch (legOrSet) {
      case "set":
        return setsWon === toWin;
      case "leg":
        return legsWon === toWin;
      default:
        break;
    }
  };
  return {
    ...state,
    [inapKey]: {
      ...inapData,
      legsWon: legsWon === legsPerSet ? 0 : legsWon,
      setsWon: setsWon,
      score: startingScore,
      tsLeg: 0,
      norLeg: 0,
      avgLeg: 0,
      avgMatch,
      dartsUsedInLeg: 0,
      dartsUsedInMatch: dartsUsedInMatch + nodUsed,
      onCheckout: false,
      numOfCoDarts: numOfCoDarts,
      doublePercentage: doublePercentage,
      bestLegByDartsUsed: bestLegByDartsUsed,
      bestAvgLeg: bestAvgLeg,
      highestCheckout: highestCheckout,
      canGoBack: false,
    },
    [apKey]: {
      ...apData,
      score: startingScore,
      tsLeg: 0,
      norLeg: 0,
      dartsUsedInLeg: 0,
      avgLeg: 0,
      onCheckout: false,
      canGoBack: false,
    },
    isInputByDart: false,
    inputByRound: ["", "", ""],
    inputByDartArray: ["", "", "", "", "", ""],
    inputByDart: {
      first: ["", ""],
      second: ["", ""],
      third: ["", ""],
    },
    whichDart: 1,
    inputIndex: 0,
    scoreToSubmit: [],

    isMatchOver: isMatchOver(),
    isLegOver: false,
    status: isMatchOver() ? "finished" : "pending",
    winner: isMatchOver() ? inactivePlayer : null,
  };
};

export default finishLeg;
