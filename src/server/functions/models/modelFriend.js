const friendModel = (id, username, img) => ({
  id,
  key: username,
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

module.exports = friendModel;
