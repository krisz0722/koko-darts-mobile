import auth from "@react-native-firebase/auth";

export const signUp = (email, password, navigation) => {
  console.log(auth);
  console.log("signing up...");
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log("sign up successful");
      LogIn(email, password, navigation);
    })
    .catch((err) => {
      alert(err);
    });
};

export const logOut = (navigation) => {
  console.log("logging out...");
  auth()
    .signOut()
    .then(() => {
      console.log("logged out");
      navigation.navigate("welcome");
    });
};

export const LogIn = (email, password, navigation) => {
  console.log("logging in...");
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("log in successful");
      navigation.navigate("homenavigator");
    })
    .catch((err) => {
      alert(err);
    });
};

export const deleteAccount = (navigation) => {
  console.log("deleting user...");

  auth()
    .currentUser.delete()
    .then(() => {
      console.log("user has been deleted");
      navigation.navigate("welcome");
    });
};

export const forgotPassword = (email) => {
  auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      console.log("email  sent");
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
};

export const onAuthStateChange = () => {
  auth().onAuthStateChanged((user) => {
    console.log("STATACHANGE", user);
  });
};
