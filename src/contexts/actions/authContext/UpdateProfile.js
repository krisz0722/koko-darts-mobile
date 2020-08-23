import { getProfileByUsername, updateProfile } from "../../../fb/crud";

const updateAuthProfile = async (p1, p2, gameData) => {
  const update = async (p) => {
    const {
      settings: { p1, p2, legOrSet },
      p1_DATA,
      winner,
      p2_DATA,
      date,
      key,
    } = gameData;
    const userProfile = await getProfileByUsername(p);
    const { matches, unfinishedMatches, friends, userOverall } = userProfile;
    const player = p === p1.key ? p1.key : p2.key;
    const opponent = p === p1.key ? p2.key : p1.key;

    const userData = player === p1.key ? p1_DATA : p2_DATA;
    const opponentData = opponent === p1.key ? p1_DATA : p2_DATA;

    const result =
      legOrSet === "set"
        ? `${userData.setsWon} - ${opponentData.setsWon}`
        : `${userData.legsWon} - ${opponentData.legsWon}`;

    const wonOrLost = player === gameData.settings[winner].key ? "W" : "L";

    const avgMatchOpponent = opponentData.avgMatch;
    const avgMatch = userData.avgMatch;

    const updateUserMatches = () => {
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
        key,
        status: "finished",
      };

      matches.unshift(matchToSave);
      return matches;
    };

    const updateUserUnfinishedMatches = () => {
      console.log("UNFINISHED MATCHS BEFORE", unfinishedMatches);
      const newUnfinishedMatches = unfinishedMatches.filter(
        (item) => item.key !== key,
      );
      console.log("UNFINISHED MATCHS AFTEr", newUnfinishedMatches);
      return newUnfinishedMatches;
    };

    const updateUserFriends = () => {
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

      const profile = friends.find((item) => item.key === opponent);
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
    updateProfile(
      p,
      updateUserMatches(),
      updateUserUnfinishedMatches(),
      updateUserFriends(),
      updateUserOverall(),
      key,
    );
  };

  update(p1);
  update(p2);
};

export default updateAuthProfile;
