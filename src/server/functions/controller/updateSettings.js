const { usersCollection } = require("../app");

const updateSettings = async (req, res) => {
  const { username, settings } = req.body;
  try {
    await usersCollection.doc(username).update({
      settings,
    });
    res.status(200).json({
      message: "profile status updated ",
    });
  } catch (err) {
    console.log("error while updating settings: " + err);
    res.status(400).json({
      message: "error while updating settings: " + err,
    });
  }
};

module.exports = updateSettings;
