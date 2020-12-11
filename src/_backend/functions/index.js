const functionsGlobal = require("firebase-functions");
const functions = functionsGlobal.region("europe-west3");
const admin = require("firebase-admin");
const { updateFriendsProfiles } = require("./crud/updateFriendsProfiles");
const { userModel } = require("./models/modelUser");
admin.initializeApp();

exports.createProfile = functions.auth.user().onCreate((user) => {
  const { uid, displayName, email, photoURL } = user;

  return admin
    .firestore()
    .collection("users")
    .doc(uid)
    .set(userModel(uid, displayName, email, photoURL))
    .then(() => {
      return {
        code: 200,
        message: "user profile has been created successfully",
        // data: context,
      };
    })
    .catch((err) => {
      return {
        code: 400,
        message: "ERROR while creating user profile: " + err,
        // data: context,
      };
    });
});

exports.updateProfileWithUsername = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functionsGlobal.https.HttpsError(
      "unauthenticated",
      "Only authenticated users can perform this action",
    );
  }
  console.log("CONTEXT UID", context.auth.uid);
  return new Promise((resolve, reject) => {
    admin
      .firestore()
      .collection("users")
      .doc(context.auth.uid)
      .update({
        username: data.username,
      })
      .then(() => {
        return resolve({
          code: 200,
          message: "success",
        });
      })
      .catch(reject);
  });
});

exports.deleteUser = functions.auth.user().onDelete((data, context) => {
  if (!context.auth) {
    throw new functionsGlobal.https.HttpsError(
      "unauthenticated",
      "Only authenticated users can perform this action",
    );
  }
  const friendsProfiles = admin
    .firestore()
    .collection("users")
    .where("friends", "array-contains", data.username)
    .get()
    .then((snapshot) => {
      return {
        code: 200,
        message: "user's friends' profiles have been retrieved successfully",
        data: snapshot,
      };
    })
    .catch((err) => {
      return {
        code: 400,
        message: "ERROR while changing user's username: " + err,
      };
    });

  updateFriendsProfiles(friendsProfiles);

  return admin
    .firestore()
    .colection("users")
    .doc(uid)
    .delete()
    .then(() => {
      return {
        code: 200,
        message: "user's data has been deleted successfully",
      };
    })
    .catch((err) => {
      return {
        code: 400,
        message: "ERROR while deleting user's data from database: " + err,
      };
    });
});

exports.getUsernameAvailability = functions.https.onCall((data, context) => {
  return admin
    .firestore()
    .where("username", "==", data.username)
    .get()
    .then((snapshot) => {
      return {
        code: 200,
        message: "username availability check has been performed successfully",
        data: snapshot.size,
      };
    })
    .catch((err) => {
      return {
        code: 400,
        message: "ERROR while checking username availability: " + err,
      };
    });
});

exports.getUserData = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functionsGlobal.https.HttpsError(
      "unauthenticated",
      "Only authenticated users can perform this action",
    );
  }
  const userData = await admin
    .firestore()
    .collection("users")
    .doc(context.auth.uid)
    .get()
    .then((documentSnapshot) => {
      return {
        code: 200,
        message: "user's data has been retrieved successfully",
        data: documentSnapshot.data(),
      };
    })
    .catch((err) => {
      return {
        code: 400,
        message: "ERROR while retrieveing user's data: " + err,
      };
    });
  return userData;
});
