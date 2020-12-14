const { usersCollection } = require("../app");

const checkOpponentsStatus = async (req, res) => {
  const opponent = req.body.opponent;
  try {
    const opponentProfile = await usersCollection
      .doc(opponent)
      .get()
      .then((documentSnapshot) => documentSnapshot.data());
    const status = opponentProfile.inGame;

    res.status(200).json({
      data: status,
    });
  } catch (err) {
    console.log("error while checking opponents status: " + err);
    res
      .status(400)
      .json({ error: "error while checking opponents status: " + err });
  }
};

module.exports = checkOpponentsStatus;
