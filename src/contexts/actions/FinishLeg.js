const finishLeg = (state, numOfCoDartsUsed, numOfCoDartsRequired) => {
  const { activePlayer, inactivePlayer, legOrSet, toWin } = state;
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
  numOfCoDarts = numOfCoDarts + numOfCoDartsUsed - numOfCoDartsRequired + 1;
  dartsUsedInLeg += numOfCoDartsUsed;
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
      score: state.startingScore,
      tsLeg: 0,
      norLeg: 0,
      dartsUsedInLeg: 0,
      avgLeg: 0,
      onCheckout: false,
      canGoBack: false,
    },
    isMatchOver: isMatchOver(),
    isLegOver: false,
    status: isMatchOver() ? "finished" : "pending",
    winner: isMatchOver() ? state[inactivePlayer] : null,
  };
};

export default finishLeg;
