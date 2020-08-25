// import { Alert } from "react-native";
//
// const throwError = (err, type) => {
//   const alertTitle = () => {
//     switch (type) {
//       case "signUp":
//         return "Error while signing up with email and password";
//       case "signInGoogle":
//         return "Error while signing up with Google credentials";
//       case "login":
//         return "Error while logging in with email and password";
//       case "delete":
//         return "Error while deleting account";
//       case "logout":
//         return "Error while logging out";
//       default:
//         return "Unknown error";
//     }
//   };
//
//   const alertMessage = () => {
//     switch (err) {
//       case "usernametaken":
//         return "The username is taken. Username must be unique. Please choose another username and try again.";
//       case "auth/user-not-found":
//         return "There is no user record with the given e-mail credentials";
//       case "auth/wrong-password":
//         return "The password is invalid or does not match the password corresponding to the e-mail address. ";
//       case "auth/invalid-email":
//         return "The e-mail address is invalid.";
//     }
//   };
//
//   Alert.alert(
//       alertTitle(),
//       alertMessage(),
//       [{ text: "OK", onPress: () => console.log("OK Pressed") }],
//       { cancelable: false },
//   );
// };
//
// export default throwError;
