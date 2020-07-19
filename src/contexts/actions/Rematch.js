const rematch = (state, activePlayer, inactivePlayer, GAME_DEFAULT_STATE) => {
  const { toWin, legOrSet, startingScore } = state;

  state = {
    ...GAME_DEFAULT_STATE,
    status: "started",

    p1: activePlayer,
    p2: inactivePlayer,
    activePlayer: "p1",
    inactivePlayer: "p2",
    legOrSet,
    toWin,
    startingScore,
    rematchInitiated: false,
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
    p1_DATA: {
      ...GAME_DEFAULT_STATE.p1_DATA,
      score: startingScore,
    },
    p2_DATA: {
      ...GAME_DEFAULT_STATE.p2_DATA,
      score: startingScore,
    },
  };

  return state;
};

export default rematch;
