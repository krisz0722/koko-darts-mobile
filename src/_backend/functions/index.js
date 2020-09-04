let functions = require("firebase-functions");
const admin = require("firebase-admin");
const { createProfile } = require("./crud/createProfile");
const {
  updateProfileWithUsername,
} = require("./crud/updateProfileWithUsername");

functions = functions.region("europe-west3");

admin.initializeApp();

exports.userSignUp = functions.auth.user().onCreate((user) => {
  console.log("USER HAS BEEN CREATED", user);
  return createProfile(user);
});
