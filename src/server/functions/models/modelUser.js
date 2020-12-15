const moment = require("moment");
const friendModel = require("./modelFriend");

const userModel = (username, photo, id) => ({
  id,
  username,
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
  friends: [friendModel("ID_GUEST", "GUEST", "")],
  friendsID: ["ID_GUEST"],
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
      id: id,
      key: username,
      img: photo,
      gamesPlayed: 0,
      winningPercentage: 0,
      overallAvg: 0,
      bestMatch: 0,
    },
    p2: {
      id: "",
      key: "",
      img: "",
    },
    layout: "classic",
    legOrSet: "set",
    toWin: 3,
    legsPerSet: 3,
    startingScore: 501,
    playerToStartLeg: "p1",
    playerToStartSet: "p1",
    opacity: true,
    animation: true,
    background: true,
    theme: "contrast",
  },
});

module.exports = userModel;
