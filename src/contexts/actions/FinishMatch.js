import { updateProfile } from "../../fb/crud";

const finishMatch = (state, username, matches, friends, userOverall) => {
  const {
    settings: { p1, p2 },
    p1_DATA,
    winner,
    p2_DATA,
    legOrSet,
    date,
    opponent,
  } = state;
  const userData = p1.key === username ? p1_DATA : p2_DATA;
  const opponentData = p1.key === username ? p2_DATA : p1_DATA;
  const { avgMatch, legsWon } = userData;
  const legsWonOpponent = opponentData.legsWon;
  const avgMatchOpponent = opponentData.avgMatch;
  const result =
    legOrSet === "set"
      ? `${userData.setsWon} - ${opponentData.setsWon}`
      : `${userData.legsWon} - ${opponentData.legsWon}`;

  const wonOrLost = username === winner ? "W" : "L";

  const matchSummary = {
    date,
    opponent,
    result,
    wonOrLost: "",
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

  matches.shift();
  matches.unshift(matchToSave);

  const updateFriendProfile = () => {
    const friendProfile = friends.find((item) => item.key === opponent);
    let {
      winsAgainst,
      lossesAgainst,
      legsWonAgainst,
      legsLostAgainst,
      bestMatchAgainst,
      bestMatchFriend,
    } = friendProfile;
    winsAgainst = wonOrLost === "W" ? winsAgainst + 1 : winsAgainst;
    lossesAgainst = wonOrLost === "L" ? lossesAgainst + 1 : lossesAgainst;
    legsWonAgainst = legsWonAgainst + legsWon;
    legsLostAgainst = legsLostAgainst + legsWonOpponent;
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
      legsWonAgainst,
      legsLostAgainst,
      bestMatchFriend,
      bestMatchAgainst,
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
    wins = wonOrLost === "W" ? wins + 1 : wins;
    losses = wonOrLost === "L" ? losses + 1 : losses;
    winningPercentage = wins / totalGames;
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

  updateProfile(
    username,
    matches,
    friends,
    opponent,
    updateFriendProfile(),
    updateUserOverall(),
  );

  return {
    ...state,
    isMatchOver: false,
    status: "finished",
  };
};

export default finishMatch;
