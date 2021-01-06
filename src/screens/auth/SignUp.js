import React, { useContext, useState } from "react";
import { Keyboard, KeyboardAvoidingView, SafeAreaView } from "react-native";
import { Form, Inputs } from "./StyledAuth";
import AUTH_BUTTON from "../../components/buttons/LoginButton";
import TEXT_INPUT from "../../components/buttons/TextInput";
import { ThemeContext } from "../../contexts/ThemeContext";
import signUp from "../../utils/auth/authSignUpEmail";
import { ErrorMessage } from "../contact/StyledContact";

const REGISTER = React.memo(({ navigation }) => {
  const { theme } = useContext(ThemeContext);

  const [username, setUsername] = useState("test_01");
  const [email, setEmail] = useState("test1@gmail.com");
  const [password, setPassword] = useState("111111");
  const [confirmPassword, setConfirmPassword] = useState("111111");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [focus, setFocus] = useState(undefined);
  const [isKeyboardUp, setIsKeyboardUp] = useState(false);
  const [error, setError] = useState(null);

  const keyboardDidHide = () => {
    setIsKeyboardUp(false);
    setFocus(undefined);
  };

  Keyboard.addListener("keyboardDidHide", keyboardDidHide);

  const enableSignUp =
    [email, password, username, confirmPassword].filter(
      (item) => item.length < 5,
    ).length === 0;

  const handleUsername = (val) => {
    setError();
    setUsername(val);
  };
  const handleEmail = (val) => {
    setError();
    setEmail(val);
  };
  const handlePassword = (val) => {
    setError();
    setPassword(val);
  };
  const handleConfirmPassword = (val) => {
    setError();
    setConfirmPassword(val);
  };
  const handleFocus = (val) => {
    if (val === "confirmPassword") {
      setIsKeyboardUp(true);
    } else {
      setIsKeyboardUp(false);
    }
    setFocus(val);
  };
  const toggleSecureEntry = () => setPasswordHidden(!passwordHidden);

  const INPUTS = [
    {
      name: "username",
      value: username,
      placeholder: "Username",
      type: "username",
      action: handleUsername,
      icon: "person",
      iconAction: () => {},
    },
    {
      name: "email",
      value: email,
      placeholder: "Email",
      type: "email",
      action: handleEmail,
      icon: "email",
      iconAction: () => {},
    },
    {
      name: "password",
      value: password,
      placeholder: "Password",
      type: "password",
      action: handlePassword,
      icon: passwordHidden ? "visibility" : "visibility-off",
      iconAction: toggleSecureEntry,
    },
    {
      name: "confirmPassword",
      value: confirmPassword,
      placeholder: "Confirm password",
      type: "password",
      action: handleConfirmPassword,
      icon: passwordHidden ? "visibility" : "visibility-off",
      iconAction: toggleSecureEntry,
    },
  ];

  const regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gim;

  //ide check post
  const validateForm = async () => {
    const isAvailable = await fetch(
      "https://europe-west3-kokodarts-native.cloudfunctions.net/app/api/createprofile",
      {
        method: "post",
        body: JSON.stringify({ username }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    )
      .then((response) => response.json())
      .then((data) => data.data);

    if (!regexp.test(email)) {
      setError("the email you provided is invalid");
      return false;
    } else if (password.length < 6) {
      setError("password must be at least 6 character long");
      return false;
    } else if (username.length < 3) {
      setError("username must be at least 3 characters long");
      return false;
    } else if (username.length > 16) {
      setError("username can't be longer than 16 characters");
      return false;
    } else if (!isAvailable) {
      setError(
        "username must be unique. the username you provided is already taken by another user",
      );
      return false;
    } else if (password !== confirmPassword) {
      setError("the passwords you provided do not match.");
      return false;
    } else {
      return true;
    }
  };

  const pressSignUp = () => {
    const validated = validateForm().then((data) => data);
    if (validated) {
      signUp(email, password, username, navigation);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "transparent", flex: 1 }}>
      <KeyboardAvoidingView
        behavior={"padding"}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
        keyboardShouldPersistTaps={"always"}
      >
        <Form isKeyboardUp={isKeyboardUp} theme={theme}>
          <ErrorMessage>{error}</ErrorMessage>
          <Inputs>
            {INPUTS.map((item, i) => (
              <TEXT_INPUT
                key={i}
                valid={item.value.length > 5}
                input={item}
                handleFocus={handleFocus}
                focused={focus === item.name}
              />
            ))}
            <AUTH_BUTTON
              type={enableSignUp ? "active" : "basic"}
              disabled={!enableSignUp}
              text={"Sign Up"}
              social={"exit-to-app"}
              action={pressSignUp}
              align={"center"}
            />
            <AUTH_BUTTON
              text={"Already have an account?\ntap here to log in!"}
              action={() => navigation.navigate("login")}
              type={"ghost"}
              align={"center"}
            />
          </Inputs>
        </Form>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
});

export default REGISTER;
