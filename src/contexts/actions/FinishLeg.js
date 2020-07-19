const finishLeg = (state, nodUsed, nodRequired) => {
  const {
    activePlayer,
    inactivePlayer,
    legOrSet,
    toWin,
    startingScore,
  } = state;
  const apKey = `${activePlayer}_DATA`;
  const apData = state[apKey];

  const inapKey = `${inactivePlayer}_DATA`;
  const inapData = state[inapKey];
  let {
    legsWon,
    setsWon,
    dartsUsedInLeg,
    bestLegByDartsUsed,
    avgLeg,
    bestavgLeg,
    numOfCoDarts,
    lastScore,
    highestCheckout,
  } = inapData;

  legsWon += 1;
  setsWon = legOrSet === "leg" || legsWon < 3 ? setsWon : setsWon + 1;
  numOfCoDarts = numOfCoDarts + nodUsed - nodRequired + 1;
  dartsUsedInLeg += nodUsed;
  bestLegByDartsUsed =
    dartsUsedInLeg < bestLegByDartsUsed || bestLegByDartsUsed === 0
      ? dartsUsedInLeg
      : bestLegByDartsUsed;
  bestavgLeg = avgLeg < bestavgLeg || bestavgLeg === 0 ? avgLeg : bestavgLeg;
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
      legsWon: legsWon,
      setsWon: setsWon,
      score: state.startingScore,
      tsLeg: 0,
      norLeg: 0,
      avgLeg: 0,
      dartsUsedInLeg: 0,
      onCheckout: false,
      numOfCoDarts: numOfCoDarts,
      doublePercentage: doublePercentage,
      bestLegByDartsUsed: bestLegByDartsUsed,
      bestavgLeg: bestavgLeg,
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
    winner: isMatchOver() ? state[inactivePlayer] : null,
  };
};

export default finishLeg;
