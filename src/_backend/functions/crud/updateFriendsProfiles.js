const admin = require("firebase-admin");

exports.updateFriendsProfiles = (arr) => {
  try {
    const updateProfiles = () =>
      arr.forEach((profile) => {
        //deleting user from its friends object

        const friends = profile.friends;

        console.log("FRIENDPROFIE", profile);
        console.log("FRIENDS", friends);

        const findUser = friends.find((user) => user.username === username);
        const index = friends.indexOf(findUser);

        friends.splice(index, 1);
        console.log("newfriendarra", friends);

        //editing FINISHED matches that the user participated in

        const matchesBefore = profile.matches;
        console.log("MATCHESBEFORE", matchesBefore);
        const matches = matchesBefore.map((match) => {
          const toChange = match.opponent === username;
          const newMatch = toChange
            ? {
                ...match,
                opponent: "DELETED USER",
                matchSummary: {
                  ...match.matchSummary,
                  opponent: "DELETED USER",
                },
              }
            : match;
          return newMatch;
        });
        console.log("MATCHES AFTER", matches);

        //deleting unfinished matches that the user is played in
        const unfinishedMatchesBefore = profile.unfinishedMatches;
        console.log("UNMATCHESBEFORE", unfinishedMatchesBefore);
        const unfinishedMatches = unfinishedMatchesBefore.filter(
          (unfinishedMatch) => {
            return unfinishedMatch.opponent !== username;
          },
        );
        console.log("UNFINISHED MATCHES AFTER", unfinishedMatches);

        //updating with the new objects
        const uid = profile.uid;

        return admin.firestore().collection("users").doc(uid).update({
          friends,
          matches,
          unfinishedMatches,
        });
      });
    return updateProfiles();
  } catch (err) {
    console.log(err);
  }
};
