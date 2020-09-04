import firestore from "@react-native-firebase/firestore";
import { userModel } from "./modelUser";

const db = firestore();
const usersCollection = db.collection("users");

const createProfile = async (email, username, photo) => {
  try {
    console.log("saving profile to database..");
    return await usersCollection
      .doc(username)
      .set(userModel(username, email, photo));
  } catch (err) {
    console.log(err);
    alert("ERROR WHILE CREATING PROFILE: ", err);
  }
};

export default createProfile;
