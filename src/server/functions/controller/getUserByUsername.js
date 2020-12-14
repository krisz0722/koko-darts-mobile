const { usersCollection } = require("../app");

const getProfileByUsername = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await usersCollection
      .where("username", "==", username)
      .get()
      .then((data) => data.data());

    res.status(200).json({
      message: "user has been fetched",
      data: user,
    });
  } catch (err) {
    console.log("error while fetching user by email: " + err);
    res.status(400).json({ error: err });
  }
};

module.exports = getProfileByUsername;
