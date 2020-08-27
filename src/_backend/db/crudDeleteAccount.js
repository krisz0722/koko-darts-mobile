import firestore from "@react-native-firebase/firestore";
import { getProfileByUsername } from "./crudGet";

const db = firestore();
const usersCollection = db.collection("users");

const deleteProfile = async (username) => {
  try {
    console.log("deleting profile from database...");

    const userProfile = await getProfileByUsername(username);
    const usersFriends = userProfile.friends.filter(
      (item) => item.key !== "GUEST" && item.key !== "DELETED USER",
    );
    console.log("USERSFRIENDS", usersFriends);

    usersFriends.forEach((friend) => {
      (async () => {
        try {
          const profile = await getProfileByUsername(friend.key);
          const friends = profile.friends;
          console.log("FRIENDPROFIE", profile);
          console.log("FRIENDS", friends);
          const findProfile = friends.find((item) => item.key === username);
          const index = friends.indexOf(findProfile);
          findProfile["key"] = "DELETED USER";
          friends[index] = findProfile;

          console.log("newfriendarra", friends);

          const matchesBefore = profile.matches;
          console.log("MATCHESBEFORE", matchesBefore);
          const matches = matchesBefore.map((item) => {
            console.log("MATCH ITEM", item);
            const toChange = item.opponent === username;
            const newMatch = toChange
              ? {
                  ...item,
                  opponent: "DELETED USER",
                  matchSummary: {
                    ...item.matchSummary,
                    opponent: "DELETED USER",
                  },
                }
              : item;
            return newMatch;
          });
          console.log("MATCHES AFTER", matches);

          const unfinishedMatchesBefore = profile.unfinishedMatches;
          console.log("UNMATCHESBEFORE", unfinishedMatchesBefore);
          const unfinishedMatches = unfinishedMatchesBefore.filter((item) => {
            return item.opponent !== username;
          });
          console.log("UNsMATCHES AFTER", unfinishedMatches);

          await usersCollection.doc(friend.key).update({
            friends,
            matches,
            unfinishedMatches,
          });
        } catch (err) {
          console.log(err);
          alert(err);
        }
      })();
    });
    await usersCollection.doc(username).delete();
    console.log("deleted from database");
  } catch (err) {
    console.log(err);
    alert("ERROR WHILE DELETING ACCOUNT: ", err);
  }
};

export default deleteProfile;
