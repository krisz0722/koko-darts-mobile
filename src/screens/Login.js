import React, { useContext, useState } from "react";
import { Keyboard, Dimensions, SafeAreaView, ScrollView } from "react-native";
import { SettingsContext } from "../contexts/SettingsContext";
import { Form, Inputs } from "../components/containers/Register";

import LoginButton from "../components/LoginButton";
import GhostButton from "../components/GhostButton";
import LoginInput from "../components/LoginInput";

export const LOGIN = ({ navigation }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const [password, setPassword] = useState("");
  const [userName, setUsername] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(false);
  const [focus, setFocus] = useState(undefined);
  const [isKeyboardUp, setIsKeyboardUp] = useState(false);

  const enableSignUp =
    [password, userName].filter((item) => item.length < 6).length === 0;

  const keyboardDidShow = (e) => {
    let newSize = Dimensions.get("window").height - e.endCoordinates.height;
    setIsKeyboardUp(true);
  };

  const keyboardDidHide = (e) => {
    let newSize = Dimensions.get("window").height;
    setIsKeyboardUp(false);
    setFocus(undefined);
  };

  Keyboard.addListener("keyboardDidShow", keyboardDidShow);
  Keyboard.addListener("keyboardDidHide", keyboardDidHide);

  const handlePassword = (val) => setPassword(val);
  const handleUsername = (val) => setUsername(val);
  const handleFocus = (val) => {
    setFocus(val);
  };
  const toggleSecureEntry = () => setPasswordHidden(!passwordHidden);

  const INPUTS = [
    {
      name: "username",
      value: userName,
      placeholder: "Username",
      type: "text",
      action: handleUsername,
      icon: "person",
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
            <LoginButton disabled={!enableSignUp} text={"Sign Up"} />
          </Inputs>

          <GhostButton
            text={"Already have an account?\ntap here to log in!"}
            action={() => navigation.navigate("welcome")}
          />
        </Form>
      </ScrollView>
    </SafeAreaView>
  );
};
