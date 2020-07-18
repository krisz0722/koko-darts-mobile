const rematch = (state, activePlayer, inactivePlayer, GAME_DEFAULT_STATE) => {
  const { toWin, legOrSet, startingScore } = state;

  console.log(activePlayer, inactivePlayer);

  return {
    ...GAME_DEFAULT_STATE,
    p1: activePlayer,
    p2: inactivePlayer,
    activePlayer: "p1",
    inactivePlayer: "p2",
    legOrSet,
    toWin,
    startingScore,
    rematchInitiated: false,
    p1_DATA: {
      ...GAME_DEFAULT_STATE.p1_DATA,
      score: startingScore,
    },
    p2_DATA: {
      ...GAME_DEFAULT_STATE.p2_DATA,
      score: startingScore,
    },
  };
};

export default rematch;
