import firestore from "@react-native-firebase/firestore";
import { getProfileByUsername } from "./crudGet";
import navigatingIn from "./navigatingIn";
import navigatingOut from "./navigatingOut";

const db = firestore();
export const usersCollection = db.collection("users");

export const updateUnfinishedMatches = async (
  p1,
  p2,
  p1Match,
  p2Match,
  type,
  key,
  inGame,
  navigation,
  navigationType,
  gameData = null,
) => {
  navigatingIn(navigation, navigationType);

  const p1Profile = await getProfileByUsername(p1.key);
  const p2Profile = await getProfileByUsername(p2.key);

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

    navigatingOut(navigation, navigationType, gameData);

    console.log("matches updated!");
  } catch (err) {
    console.log(err);
    alert("ERROR WHILE SAVING MATCHES: ", err);
  }
};
