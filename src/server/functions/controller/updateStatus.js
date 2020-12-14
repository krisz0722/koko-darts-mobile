const { usersCollection } = require("../app");

const updateStatus = async (req, res) => {
  const { p1, p2, inGame } = req.body;
  try {
    await usersCollection.doc(p1).update({
      inGame,
    });
    await usersCollection.doc(p2).update({
      inGame,
    });
    res.status(200).json({
      message: "profile status updated ",
    });
  } catch (err) {
    console.log("error while updating status: " + err);
    res.status(400).json({
      message: "error while updating status: " + err,
    });
  }
};

module.exports = updateStatus;
