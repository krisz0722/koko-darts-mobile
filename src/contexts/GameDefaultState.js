const DEFAULT_PLAYER_DATA = {
  score: 301,
  lastScore: "",
  legsWon: 0,
  setsWon: 0,

  // TOTAL AGGREGATED SCORES
  tsLeg: 0,
  tsMatch: 0,
  tsFirstNine: 0,
  tsScoring: 0,

  // NUMBER OF ROUNDS AND DARTS USED
  norLeg: 0,
  norMatch: 0,
  dartsUsedInLeg: 0,
  dartsUsedInMatch: 0,
  norFirstNine: 0,
  norScoring: 0,

  // AVERAGES
  avgLeg: 0,
  avgMatch: 0,
  avgFirstNine: 0,
  avgScoring: 0,

  // CHECKOUT DATA
  missedDoubles: 0,
  numOfCoDarts: 0,

  //  NOTABLE STATS
  highestCheckout: 0,
  bestavgLeg: 0,
  bestLegByDartsUsed: 0,
  doublePercentage: 0,

  // STATS
  60: 0,
  80: 0,
  100: 0,
  140: 0,
  180: 0,

  //OTHER
  onCheckout: false,
  canGoBack: false,
};

export const GAME_DEFAULT_STATE = {
  status: "initialize",
  p1: "esmeralda",
  p2: "jose armando",
  legOrSet: "leg",
  toWin: 1,
  legsPerSet: 3,
  startingScore: 301,
  playerToStartLeg: "p1",
  activePlayer: "p1",
  inactivePlayer: "p2",
  showStats: false,

  //PLAYERS
  p1_DATA: DEFAULT_PLAYER_DATA,
  p2_DATA: DEFAULT_PLAYER_DATA,

  //INPUT
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

  //END GAME
  isLegOver: false,
  isMatchOver: false,
  isRematch: false,
  winner: null,
};

export default GAME_DEFAULT_STATE;
