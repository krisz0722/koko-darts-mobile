const { usersCollection } = require("../app");

const updateFriendsProfiles = (arr, id) => {
  try {
    const updateProfiles = () =>
      arr.forEach((profile) => {
        //deleting user from its friends' object
        const data = profile.data();
        const friends = data.friends;
        const friendsID = data.friendsID;

        const findUser = friends.find((user) => user.id === id);

        const findUserID = friendsID.find((item) => item === id);
        const friendIndex = friends.indexOf(findUser);
        const friendsIDIndex = friendsID.indexOf(findUserID);

        friends.splice(friendIndex, 1);
        friendsID.splice(friendsIDIndex, 1);

        //editing FINISHED matches that the user participated in

        const matchesBefore = data["matches"];

        const matches = matchesBefore.map((match) => {
          const toChange = match.opponent === id;
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

        //deleting unfinished matches that the user has played in
        const unfinishedMatchesBefore = data.unfinishedMatches;
        const unfinishedMatches = unfinishedMatchesBefore.filter(
          (unfinishedMatch) => {
            return unfinishedMatch.opponent !== id;
          },
        );

        //updating with the new objects
        return usersCollection.doc(data.id).update({
          friends,
          friendsID,
          matches,
          unfinishedMatches,
        });
      });
    return updateProfiles();
  } catch (err) {
    return console.log(
      "ERROR while updating user's friends profiles after user deletion:",
      err,
    );
  }
};

module.exports = updateFriendsProfiles;
