const DEFAULT_PLAYER_DATA = {
  score: 301,
  lastScore: 301,
  legsWon: 0,
  setsWon: 0,

  // TOTAL AGGREGATED SCORES
  legTotalScore: 0,
  matchTotalScore: 0,
  firstNineDartTotalScore: 0,
  scoringDartsTotalScore: 0,

  // NUMBER OF ROUNDS AND DARTS USED
  numOfRoundsInLeg: 0,
  numOfRoundsInMatch: 0,
  dartsUsedInLeg: 0,
  dartsUsedInMatch: 0,
  numOfRoundsFirstNineDart: 0,
  numOfRoundsScoringDarts: 0,

  // AVERAGES
  legAverage: 0,
  matchAverage: 0,
  firstNineDartAverage: 0,
  scoringDartsAverage: 0,

  // CHECKOUT DATA
  missedDoubles: 0,
  numOfCoDarts: 0,

  //  NOTABLE STATS
  highestCheckout: 0,
  bestLegAverage: 0,
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
  userName: "",
  p1: "sanyika",
  p2: "lacika",
  legOrSet: "leg",
  toWin: 1,
  legsPerSet: 3,
  startingScore: 301,
  playerToStartLeg: "p1",
  activePlayer: "p1",
  inactivePlayer: "p2",
  scoreInputArray: {
    defaultInput: ["", "", ""],
    manualInput: ["", "", "", "", "", ""],
  },
  inputIndex: 0,
  scoreToSubmit: [],
  isInputManual: false,
  showStats: false,
  isLegOver: false,
  isMatchOver: false,
  isRematch: false,

  p1_DATA: DEFAULT_PLAYER_DATA,
  p2_DATA: DEFAULT_PLAYER_DATA,

  winner: null,
};

export default GAME_DEFAULT_STATE;
