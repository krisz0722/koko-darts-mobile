import React, { useContext, useState } from "react";
import { Keyboard, SafeAreaView, ScrollView } from "react-native";
import { SettingsContext } from "../../contexts/SettingsContext";
import { Buttons, Form } from "./StyledSignUp";

import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import LoginInput from "../../components/LoginInput";

const LOGIN = ({ navigation }) => {
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
    setIsKeyboardUp(true);
  };

  const keyboardDidHide = (e) => {
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
          {INPUTS.map((item) => {
            return (
              <LoginInput
                key={item.name}
                valid={item.value.length > 5}
                value={item.value}
                input={item}
                handleFocus={handleFocus}
                focused={focus === item.name}
              />
            );
          })}

          <THEMED_BUTTON
            type={enableSignUp ? "active" : "basic"}
            disabled={!enableSignUp}
            text={"log in"}
          />
        </Form>
        <Buttons>
          <THEMED_BUTTON
            text={"forgotten password"}
            action={() => navigation.navigate("home")}
            type={"ghost"}
          />
          <THEMED_BUTTON
            text={"forgotten password"}
            action={() => navigation.navigate("forgotpassword")}
            type={"ghost"}
          />
        </Buttons>
      </ScrollView>
    </SafeAreaView>
  );
};
export default LOGIN;
