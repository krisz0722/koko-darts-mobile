import { auth } from "./firebaseConfig";

export const signUp = (email, password, navigation) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      LogIn(email, password, navigation);
    })
    .catch((err) => {
      alert(err);
    });
};

export const logOut = () => {
  auth.signOut().then(() => {
    console.log("logged out");
  });
};

export const LogIn = (email, password, navigation) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      navigation.navigate("homenavigator");
    })
    .catch((err) => {
      alert(err);
    });
};

export const deleteAccount = () => {
  auth.currentUser.delete().then(() => {
    console.log("user has been deleted");
  });
};

export const forgotPassword = (email) => {
  auth
    .sendPasswordResetEmail(email)
    .then(() => {
      console.log("email  sent");
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
};

export const onAuthStateChange = () => {
  auth.onAuthStateChanged((user) => {
    console.log("STATACHANGE", user);
  });
};
