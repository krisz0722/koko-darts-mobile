const Rematch = (
  activePlayer,
  inactivePlayer,
  p1,
  p2,
  startingScore,
  state,
  GAME_DEFAULT_STATE,
) => {
  return {
    ...state,
    ...GAME_DEFAULT_STATE,
    p1,
    p2,
    status: "started",
    activePlayer: "p1",
    inactivePlayer: "p2",
    rematchInitiated: false,
    p1_DATA: {
      ...GAME_DEFAULT_STATE.p1_DATA,
      score: startingScore,
    },
    p2_DATA: {
      ...GAME_DEFAULT_STATE.p2_DATA,
      score: startingScore,
    },
    opponent: state.opponent,
  };
};

export default Rematch;
