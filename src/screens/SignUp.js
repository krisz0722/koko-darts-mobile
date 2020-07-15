import React, { useContext, useState } from "react";
import { Keyboard, SafeAreaView, ScrollView } from "react-native";
import { SettingsContext } from "../contexts/SettingsContext";
import { Form, Inputs } from "../components/containers/Register";
import THEMED_BUTTON from "../components/ThemedButton";
import LoginInput from "../components/LoginInput";

const REGISTER = ({ navigation }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUsername] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(false);
  const [focus, setFocus] = useState(undefined);
  const [isKeyboardUp, setIsKeyboardUp] = useState(false);

  const enableSignUp =
    [email, password, confirmPassword, userName].filter(
      (item) => item.length < 6,
    ).length === 0;

  const keyboardDidShow = (e) => {
    setIsKeyboardUp(true);
  };

  const keyboardDidHide = (e) => {
    setIsKeyboardUp(false);
    setFocus(undefined);
  };

  Keyboard.addListener("keyboardDidShow", keyboardDidShow);
  Keyboard.addListener("keyboardDidHide", keyboardDidHide);

  const handleEmail = (val) => setEmail(val);
  const handlePassword = (val) => setPassword(val);
  const handleConfirmPassword = (val) => setConfirmPassword(val);
  const handleUsername = (val) => setUsername(val);
  const handleFocus = (val) => {
    setFocus(val);
  };
  const toggleSecureEntry = () => setPasswordHidden(!passwordHidden);

  const INPUTS = [
    {
      name: "email",
      value: email,
      placeholder: "Email",
      type: "email",
      action: handleEmail,
      icon: "email",
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
      name: "confirm",
      value: confirmPassword,
      placeholder: "Confirm password",
      type: "password",
      action: handleConfirmPassword,
      icon: passwordHidden ? "visibility" : "visibility-off",
      iconAction: toggleSecureEntry,
    },
    {
      name: "username",
      value: userName,
      placeholder: "Username",
      type: "username",
      action: handleUsername,
      icon: "person",
    },
  ];
  return (
    <SafeAreaView style={{ backgroundColor: "transparent", flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps={"always"}
      >
        <Form theme={selectedTheme} isKeyboardUp={isKeyboardUp}>
          <Inputs>
            {INPUTS.map((item) => (
              <LoginInput
                key={item.name}
                valid={item.value.length > 5}
                input={item}
                handleFocus={handleFocus}
                focused={focus === item.name}
              />
            ))}
          </Inputs>
          <THEMED_BUTTON
            type={enableSignUp ? "active" : "basic"}
            disabled={!enableSignUp}
            text={"Sign Up"}
          />

          <THEMED_BUTTON
            text={"Already have an account?\ntap here to log in!"}
            action={() => navigation.navigate("login")}
            type={"ghost"}
          />
        </Form>
      </ScrollView>
    </SafeAreaView>
  );
};

export default REGISTER;
