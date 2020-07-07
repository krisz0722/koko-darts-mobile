const rematch = (state, activePlayer, inactivePlayer, DEFAULT_GAME) => {
  const { toWin, legOrSet, startingScore } = state;

  return {
    ...DEFAULT_GAME,
    p1: activePlayer,
    p2: inactivePlayer,
    activePlayer: "p1",
    inactivePlayer: "p2",
    legOrSet,
    toWin,
    startingScore,
    rematchInitiated: false,
    p1_DATA: {
      ...DEFAULT_GAME.p1_DATA,
      score: startingScore,
    },
    p2_DATA: {
      ...DEFAULT_GAME.p2_DATA,
      score: startingScore,
    },
  };
};

export default rematch;
