const throwError = (err, type, navigation) => {
  const alertTitle = () => {
    switch (type) {
      case "signUp":
        return "Error while signing up with email and password";
      case "signInGoogle":
        return "Error while signing up with Google credentials";
      case "signInFacebook":
        return "Error while signing up with Facebook credentials";
      case "login":
        return "Error while logging in with email and password";
      case "delete":
        return "Error while deleting account";
      case "logout":
        return "Error while logging out";
      default:
        return "Unknown error";
    }
  };

  const alertMessage = () => {
    switch (err) {
      case "12501":
        return "Authentication process has been cancelled by the user";
      case "usernametaken":
        return "The username is taken. Username must be unique. Please choose another username and try again.";
      case "auth/user-not-found":
        return "There is no user record with the given e-mail credentials";
      case "auth/wrong-password":
        return "The password is invalid or does not match the password corresponding to the e-mail address. ";
      case "auth/invalid-email":
        return "The e-mail address is invalid.";
      case "auth/invalid-credential":
        return "The supplied authentication credential is malformed or has expired.";
      case "auth/email-already-in-use":
        return "There is an account already registered with this e-mail. Try to log in.";
      case "auth/network-request-failed":
        return "A network error (such as timeout, interrupted connection or unreachable host) has occurred";
      case "auth/cancel":
        return "Authentication process has been cancelled by the user";
      case "auth/token":
        return "Something went wrong obtaining access token";
      default:
        return "Unknown error. Something went wrong. If you are experiencing problems with the app often, please report a bug.";
    }
  };

  navigation.navigate("authnavigator", {
    screen: "errorscreen",
    params: { title: alertTitle(), message: alertMessage() },
  });
  return;
};

export default throwError;
