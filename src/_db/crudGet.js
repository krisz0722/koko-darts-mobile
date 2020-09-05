import firestore from "@react-native-firebase/firestore";
const db = firestore();
export const usersCollection = db.collection("users");

export const getUsers = async () => {
  try {
    return usersCollection.get();
  } catch (err) {
    alert("ERROR WHILE GETTING USERS: ", err);
  }
};

export const getProfileByUsername = async (id) => {
  try {
    console.log("GETTING PROFILE", id);
    const user = await usersCollection
      .doc(id)
      .get()
      .then((data) => data.data());

    return user;
  } catch (err) {
    console.log(err);
    alert("ERROR WHILE FETCHING PROFILE BY USERNAME: ", err);
  }
};

export const getProfileByEmail = async (id) => {
  try {
    console.log("GETTING PROFILE BY EMAUIL", id);
    const user = await usersCollection
      .where("email", "==", id)
      .get()
      .then((snapshot) => snapshot.docs[0].data());
    console.log("USERRRR", user);

    return user;
  } catch (err) {
    console.log(err);
    alert("ERROR WHILE FETCHING PROFILE BY EMAIL: ", err);
  }
};
