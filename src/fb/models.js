import moment from "moment";

export const friendModel = (key, img) => ({
  key,
  winsAgainst: 0,
  lossesAgainst: 0,
  bestMatchFriend: 0,
  bestMatchAgainst: 0,
  totalThrowsAgainst: 0,
  totalThrowsFriend: 0,
  totalScoreAgainst: 0,
  totalScoreFriend: 0,
  avgAgainst: 0,
  avgFriend: 0,
  img,
});

export const userModel = (username, email, photo) => ({
  username,
  email,
  registeredOn: moment().format("MMMM Do YYYY, h:mm a"),
  img: photo,
  userOverall: {
    totalGames: 0,
    totalThrows: 0,
    totalScore: 0,
    wins: 0,
    losses: 0,
    winningPercentage: 0,
    overallAvg: 0,
    bestMatch: 0,
  },
  friends: [friendModel("GUEST", require("../../assets/bg.png"))],
  inGame: false,
  inGameKey: null,
  matches: [],
  unfinishedMatches: [],
  matchRequestReceived: [],
  matchRequestSent: [],
  friendRequestReceived: [],
  friendRequestSent: [],
  settings: {
    p1: {
      key: username,
      img: "../../assets/bg.png",
      gamesPlayed: 0,
      winningPercentage: 0,
      overallAvg: 0,
      bestMatch: 0,
    },
    p2: {
      key: "",
      img: "",
    },
    layout: "classic",
    legOrSet: "set",
    toWin: 3,
    legsPerSet: 3,
    startingScore: 501,
    playerToStartLeg: "p1",
    opacity: true,
    animation: true,
    background: true,
    theme: "default",
  },
});
