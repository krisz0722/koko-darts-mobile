const { usersCollection } = require("../app");

const getUsernameAvailability = async (req, res) => {
  let { username } = req.body;

  try {
    const usersRef = await usersCollection.get();
    let users = [];
    usersRef.forEach((doc) => users.push(doc.data()));

    const isTaken = users.find((user) => user.username === username);

    if (!isTaken) {
      return res.status(200).json({
        data: true,
        message: "username is available",
      });
    } else {
      return res.status(400).json({
        data: false,
        message: "the username is taken, please choose another one",
      });
    }
  } catch (err) {
    console.log("error while checking username availability: " + err);
    res
      .status(400)
      .json({ err: "error while checking username availability: " + err });
  }
};

module.exports = getUsernameAvailability;
