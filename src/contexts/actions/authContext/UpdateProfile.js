import fetchPost from "../../../utils/fetchPost";

const updateAuthProfile = async (
  player,
  whichPlayer,
  playerData,
  opponentData,
  gameData,
  inGame,
) => {
  const {
    settings: { legOrSet },
    p1_DATA,
    p2_DATA,
    winner,
    date,
    key,
    initializedBy,
  } = gameData;

  if (player.id === "ID_GUEST") {
    return null;
  }
  const userProfile = await fetchPost("api/getuserdata", { uid: player.id });
  const { matches, unfinishedMatches, friends, userOverall } = userProfile;

  const playerGameData = whichPlayer === "p1" ? p1_DATA : p2_DATA;
  const opponentGameData = whichPlayer === "p1" ? p2_DATA : p1_DATA;

  const result =
    legOrSet === "set"
      ? `${playerGameData.setsWon} - ${opponentGameData.setsWon}`
      : `${playerGameData.legsWon} - ${opponentGameData.legsWon}`;

  const wonOrLost = player.id === gameData.settings[winner].id ? "W" : "L";

  const avgMatchOpponent = opponentGameData.avgMatch;
  const avgMatch = playerGameData.avgMatch;

  const updateUserMatches = () => {
    const matchSummary = {
      date,
      opponent: opponentData,
      result,
      wonOrLost,
      avg: avgMatch,
      legOrSet,
    };

    const p1 = whichPlayer === "p1" ? playerData : opponentData;
    const p2 = whichPlayer === "p2" ? playerData : opponentData;

    const matchToSave = {
      matchSummary,
      p1,
      p2,
      p1_DATA,
      p2_DATA,
      winner,
      date,
      opponent: opponentData,
      key,
      status: "finished",
      initializedBy,
    };

    matches.unshift(matchToSave);
    return matches;
  };

  const updateUserUnfinishedMatches = () => {
    const newUnfinishedMatches = unfinishedMatches.filter(
      (item) => item.key !== key,
    );
    return newUnfinishedMatches;
  };

  const updateUserFriends = () => {
    const friendProfile = friends.find((item) => item.id === opponentData.id);
    let {
      winsAgainst,
      lossesAgainst,
      totalThrowsAgainst,
      totalThrowsFriend,
      totalScoreAgainst,
      totalScoreFriend,
      avgAgainst,
      avgFriend,
      bestMatchAgainst,
      bestMatchFriend,
    } = friendProfile;

    winsAgainst = wonOrLost === "W" ? winsAgainst + 1 : winsAgainst;
    lossesAgainst = wonOrLost === "L" ? lossesAgainst + 1 : lossesAgainst;
    totalThrowsAgainst += playerGameData.dartsUsedInMatch;
    totalScoreAgainst += playerGameData.tsMatch;
    totalThrowsFriend += opponentGameData.dartsUsedInMatch;
    totalScoreFriend += opponentGameData.tsMatch;
    avgAgainst = totalScoreAgainst / (totalThrowsAgainst / 3);
    avgFriend = totalScoreFriend / (totalThrowsFriend / 3);

    bestMatchAgainst =
      avgMatch > bestMatchAgainst && bestMatchAgainst !== "N/A"
        ? avgMatch
        : bestMatchAgainst;
    bestMatchFriend =
      avgMatchOpponent > bestMatchFriend && bestMatchFriend !== "N/A"
        ? avgMatchOpponent
        : bestMatchFriend;

    const updatedFriendProfile = {
      ...friendProfile,
      winsAgainst,
      lossesAgainst,
      bestMatchFriend,
      bestMatchAgainst,
      totalThrowsAgainst,
      totalThrowsFriend,
      totalScoreAgainst,
      totalScoreFriend,
      avgAgainst,
      avgFriend,
    };

    const profile = friends.find((item) => item.id === opponentData.id);
    const index = friends.indexOf(profile);
    friends[index] = updatedFriendProfile;

    return friends;
  };

  const updateUserOverall = () => {
    let {
      totalThrows,
      totalScore,
      totalGames,
      winningPercentage,
      wins,
      losses,
      overallAvg,
      bestMatch,
    } = userOverall;

    totalGames++;
    totalThrows = totalThrows + playerGameData.dartsUsedInMatch;
    totalScore = totalScore + playerGameData.tsMatch;
    overallAvg = totalScore / (totalThrows / 3);
    wins = wonOrLost === "W" ? wins + 1 : wins;
    losses = wonOrLost === "L" ? losses + 1 : losses;
    winningPercentage = ((wins / totalGames) * 100).toFixed() + "%";
    bestMatch =
      avgMatch > bestMatch && bestMatch !== "N/A" ? avgMatch : bestMatch;

    return {
      totalThrows,
      totalScore,
      totalGames,
      winningPercentage,
      wins,
      losses,
      overallAvg,
      bestMatch,
    };
  };

  return await fetchPost("api/updateprofile", {
    matches: updateUserMatches(),
    unfinishedMatches: updateUserUnfinishedMatches(),
    friends: updateUserFriends(),
    userOverall: updateUserOverall(),
    key,
    inGame,
    id: player.id,
  });
};

export default updateAuthProfile;

//TODO HEEEE
