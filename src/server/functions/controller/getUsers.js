const { usersCollection } = require("../app");

const getUsers = async (req, res) => {
  try {
    const usersRef = await usersCollection.get();
    let users = [];
    usersRef.forEach((doc) => users.push(doc.data()));

    res.status(200).json({
      message: "users have been fetched",
      data: users,
    });
  } catch (err) {
    console.log("error while fetching users' data: " + err);
    res.status(400).json({ error: err });
  }
};

module.exports = getUsers;
