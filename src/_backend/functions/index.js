let functions = require("firebase-functions");
const admin = require("firebase-admin");
const { createProfile } = require("./crud/createProfile");
const { getUser } = require("./crud/getUser");
const { getUsersArray } = require("./crud/getUsersArray");
const { updateFriendsProfiles } = require("./crud/updateFriendsProfiles");
const { deleteProfile } = require("./crud/deleteProfile");
const {
  updateProfileWithUsername,
} = require("./crud/updateProfileWithUsername");

functions = functions.region("europe-west3");

admin.initializeApp();

exports.signUpEmail = functions.auth.user().onCreate((user) => {
  return createProfile(user);
});

exports.updateProfileWithUsername = functions.https.onCall((data, context) => {
  console.log("DATA", data);
  console.log("CONTEXT", context);
  admin.firestore().collection("users").doc(uid).update({
    username,
  });
  return {
    anyad: "picsaja",
  };
});

exports.deleteUser = functions.auth.user().onDelete((user) => {
  const { uid } = user;
  const userData = getUser(uid);
  const usersFriends = userData.friends.filter(
    (item) => item.key !== "GUEST" && item.key !== "DELETED USER",
  );
  const friendsProfiles = getUsersArray(usersFriends);
  updateFriendsProfiles(friendsProfiles);
  arr;
  return deleteProfile(uid);
});

exports.getUsernameAvailability = functions.https.onCall(
  async (data, context) => {
    const usersWithTheSameUsername = await admin
      .firestore()
      .where("username", "==", data.name)
      .get();
    return usersWithTheSameUsername;
  },
);

exports.getUserData = functions.https.onCall(async (data, context) => {
  return admin
    .firestore()
    .collection("users")
    .where("email", "==", data.email)
    .get();
});
