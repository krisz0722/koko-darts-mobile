import firestore from "@react-native-firebase/firestore";
const db = firestore();
export const usersCollection = db.collection("users");

export const checkUsernameAvailability = async (username) => {
  try {
    return await usersCollection
      .where("username", "==", username)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.size;
      });
  } catch (err) {
    console.log(err);
    alert("ERROR WHILE CHECKING USERNAME AVAILABILITY: ", err);
  }
};

export const checkOpponentsStatus = async (opponent) => {
  try {
    const opponentProfile = await usersCollection
      .doc(opponent)
      .get()
      .then((documentSnapshot) => documentSnapshot.data());
    const status = opponentProfile.inGame;

    return status;
  } catch (err) {
    console.log(err);
    alert("ERROR: ", err);
  }
};
