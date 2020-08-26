import auth from "@react-native-firebase/auth";

export const forgotPassword = async (email) => {
  try {
    await auth().sendPasswordResetEmail(email);
  } catch (err) {
    console.log("ERROR", err);
  }
};

export const onAuthStateChange = () => {
  auth().onAuthStateChanged((user) => {
    console.log("STATACHANGE", user);
  });
};
