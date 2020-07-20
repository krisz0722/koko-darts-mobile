import React, { useContext, useState } from "react";
import { Keyboard, KeyboardAvoidingView, SafeAreaView } from "react-native";
import { SettingsContext } from "../../contexts/SettingsContext";
import { Buttons, Form2, Inputs } from "./StyledAuth";

import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import LoginInput from "../../components/buttons/LoginInput";

const FORGOT_PASSWORD = ({ navigation }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const [email, setEmail] = useState("");
  const [focus, setFocus] = useState(undefined);
  const [isKeyboardUp, setIsKeyboardUp] = useState(false);

  const enableSignUp = email.length > 5;

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
  const handleFocus = (val) => {
    setFocus(val);
  };

  const INPUT = {
    name: "email",
    value: email,
    placeholder: "Email",
    type: "email",
    action: handleEmail,
    icon: "email",
  };
  return (
    <SafeAreaView style={{ backgroundColor: "transparent", flex: 1 }}>
      <KeyboardAvoidingView
        behavior={"padding"}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps={"always"}
      >
        <Form2 theme={selectedTheme} isKeyboardUp={isKeyboardUp}>
          <Inputs>
            <LoginInput
              valid={email.length > 5}
              value={email}
              input={INPUT}
              handleFocus={handleFocus}
              focused={focus === INPUT.name}
            />
          </Inputs>
          <THEMED_BUTTON
            type={enableSignUp ? "active" : "basic"}
            disabled={!enableSignUp}
            text={"restore password"}
            action={() => navigation.navigate("login")}
          />
          <Buttons />
        </Form2>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default FORGOT_PASSWORD;
