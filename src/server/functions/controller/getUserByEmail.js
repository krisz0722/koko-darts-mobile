const { usersCollection } = require("../app");

const getProfileByEmail = async (req, res) => {
  const { id } = req.body;

  try {
    const userRef = await usersCollection
      .where("email", "==", id)
      .get()
      .then((snapshot) => snapshot.docs[0]);

    const user = userRef ? userRef.data() : null;

    res.status(200).json({
      message: "user has been fetched",
      data: user,
    });
  } catch (err) {
    console.log("error while fetching user by email: " + err);
    res.status(400).json({ error: err });
  }
};

module.exports = getProfileByEmail;
