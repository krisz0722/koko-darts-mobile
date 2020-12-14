const createProfile = require("./controller/createProfile");
const getUsernameAvailability = require("./controller/getUsernameAvailability");
const getUserByEmail = require("./controller/getUserByEmail");
const getProfileByUsername = require("./controller/getUserByUsername");
const updateProfile = require("./controller/updateProfile");
const getUsers = require("./controller/getUsers");
const updateUnfinishedMatches = require("./controller/updateUnfinishedMatches");
const updatefriendRequestSent = require("./controller/updateFriendRequestSent");
const updatefriendRequestReceived = require("./controller/updatefriendRequestReceived");
const updateSettings = require("./controller/updateSettings");
const updateStatus = require("./controller/updateStatus");
const checkOpponentStatus = require("./controller/checkOpponentStatus");
const acceptFriendRequest = require("./controller/acceptFriendRequest");
const declineFriendRequest = require("./controller/declineFriendRequest");
const deleteProfile = require("./controller/deleteProfile");
const getUserData = require("./controller/getUserData");

const express = require("express");

const router = express.Router();

router.route("/api/createprofile").post(createProfile);
router.route("/api/updateprofile").post(updateProfile);
router.route("/api/deleteprofile").post(deleteProfile);

router.route("/api/getusernameavailability").post(getUsernameAvailability);
router.route("/api/getuserbyemail").post(getUserByEmail);
router.route("/api/getuserbyusername").post(getProfileByUsername);
router.route("/api/getusers").get(getUsers);
router.route("/api/getuserdata").post(getUserData);

router.route("/api/updateunfinishedmatches").post(updateUnfinishedMatches);

router.route("/api/checkopponent").post(checkOpponentStatus);

router.route("/api/acceptrequest").post(acceptFriendRequest);
router.route("/api/declinerequest").post(declineFriendRequest);
router.route("/api/updatefriendrequestsent").post(updatefriendRequestSent);
router
  .route("/api/updatefriendrequestreceived")
  .post(updatefriendRequestReceived);

router.route("/api/updatesettings").post(updateSettings);
router.route("/api/updatestatus").post(updateStatus);

module.exports = router;
