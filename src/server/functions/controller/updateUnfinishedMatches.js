const { usersCollection } = require("../app");

const updateUnfinishedMatches = async () => {
  const { p1, p2, p1Match, p2Match, type, key, inGame } = req.body;

  const p1Profile = await usersCollection
    .doc(p1.key)
    .get()
    .then((data) => data.data());
  const p2Profile = await usersCollection
    .doc(p2.key)
    .get()
    .then((data) => data.data());

  const p1Matches = p1Profile.unfinishedMatches;
  const p2Matches = p2Profile.unfinishedMatches;

  const p1MatchIndex = p1Matches.indexOf(
    p1Matches.find((item) => item.key === key),
  );
  const p2MatchIndex = p2Matches.indexOf(
    p2Matches.find((item) => item.key === key),
  );

  switch (type) {
    case "add":
      p1Matches.unshift(p1Match);
      p2Matches.unshift(p2Match);
      break;
    case "save":
      p1Matches[p1MatchIndex] = p1Match;
      p2Matches[p2MatchIndex] = p2Match;
      break;
    case "delete":
      p1Matches.splice(p1MatchIndex, 1);
      p2Matches.splice(p2MatchIndex, 1);
      break;
  }

  try {
    await usersCollection.doc(p1.key).update({
      unfinishedMatches: p1Matches,
      inGame,
      inGameKey: key,
    });

    await usersCollection.doc(p2.key).update({
      unfinishedMatches: p2Matches,
      inGame,
      inGameKey: key,
    });

    res.status(200).json({
      message: "mathces are updated",
    });
  } catch (err) {
    console.log("error while updating matches: " + err);
    res.status(400).json({
      message: "error while updating matches: " + err,
    });
  }
};

module.exports = updateUnfinishedMatches;
