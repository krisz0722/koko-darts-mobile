import { updateProfile } from "../../../fb/crud";

const updateAuthProfile = (state, gameData) => {
  const { username, friends, matches, userOverall } = state;

  const {
    settings: { p1, p2, legOrSet },
    p1_DATA,
    winner,
    p2_DATA,
    date,
    opponent,
  } = gameData;

  const userData = p1.key === username ? p1_DATA : p2_DATA;
  const opponentData = p1.key === username ? p2_DATA : p1_DATA;

  const result =
    legOrSet === "set"
      ? `${userData.setsWon} - ${opponentData.setsWon}`
      : `${userData.legsWon} - ${opponentData.legsWon}`;

  const wonOrLost = username === gameData.settings[winner].key ? "W" : "L";

  const avgMatchOpponent = opponentData.avgMatch;
  const avgMatch = userData.avgMatch;

  const matchSummary = {
    date,
    opponent,
    result,
    wonOrLost,
    avg: avgMatch,
    legOrSet,
  };

  const matchToSave = {
    matchSummary,
    p1,
    p2,
    p1_DATA,
    p2_DATA,
    winner,
    date,
    opponent,
    status: "finished",
  };

  if (matches[0] && matches[0].status === "pending") {
    matches.shift();
  }

  matches.unshift(matchToSave);

  const updateFriendProfile = () => {
    const friendProfile = friends.find((item) => item.key === opponent);
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
    totalThrowsAgainst += userData.dartsUsedInMatch;
    totalScoreAgainst += userData.tsMatch;
    totalThrowsFriend += opponentData.dartsUsedInMatch;
    totalScoreFriend += opponentData.tsMatch;
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

    return {
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
    totalThrows = totalThrows + userData.dartsUsedInMatch;
    totalScore = totalScore + userData.tsMatch;
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

  const profile = friends.find((item) => item.key === opponent);
  const index = friends.indexOf(profile);
  friends[index] = updateFriendProfile();

  const updatedUserOverall = updateUserOverall();

  updateProfile(username, matches, friends, updateUserOverall());

  const updatedProfile = {
    ...state,
    username,
    matches,
    friends,
    userOverall: updatedUserOverall,
  };

  return updatedProfile;
};

export default updateAuthProfile;
