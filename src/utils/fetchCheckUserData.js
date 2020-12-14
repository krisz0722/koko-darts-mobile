import auth from "@react-native-firebase/auth";
import fetchPost from "./fetchPost";

const fetchCheckUserData = async (user, navigation, social) => {
  try {
    const authUser = auth().currentUser;
    const uid = authUser._user.uid;

    const userData = await fetchPost("api/getuserdata", {
      uid: uid,
    });
    if (!userData) {
      navigation.navigate("loadingscreen", {
        text: "creating your profile",
      });
      const userData = await fetchPost("api/createprofile", {
        uid,
        user,
        username: user.name,
        social,
      });
      return userData;
    } else {
      return userData;
    }
  } catch (err) {
    console.log(err);
  }
};

export default fetchCheckUserData;
