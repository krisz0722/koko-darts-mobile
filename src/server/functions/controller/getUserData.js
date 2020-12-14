const { usersCollection } = require("../app");

const getUserData = async (req, res) => {
  const { uid } = req.body;
  try {
    const userData = await usersCollection
      .doc(uid)
      .get()
      .then((documentSnapshot) => documentSnapshot.data());

    res.status(200).json({
      data: userData ? userData : null,
      message: "user's data has been fetched successfully",
    });
  } catch (err) {
    console.log("error while fetching user's data: " + err);
    res.status(400).json({ error: "error while fetching user's data: ", err });
  }
};

module.exports = getUserData;
