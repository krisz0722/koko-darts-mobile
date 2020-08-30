import React, { useContext, useState } from "react";
import { Keyboard, KeyboardAvoidingView, SafeAreaView } from "react-native";
import { Form2, Inputs2 } from "./StyledAuth";
import AUTH_BUTTON from "../../components/buttons/LoginButton";
import TEXT_INPUT from "../../components/buttons/TextInput";
import { ThemeContext } from "../../contexts/ThemeContext";
import LogIn from "../../_backend/auth/authLogIn";
import { Authcontext } from "../../contexts/AuthContext";
import { SettingsContext } from "../../contexts/SettingsContext";
import { GameContext } from "../../contexts/GameContext";

const LOGIN = React.memo(({ navigation }) => {
  const { dispatchGameData } = useContext(GameContext);
  const { dispatchSettings } = useContext(SettingsContext);
  const { dispatchUserData } = useContext(Authcontext);
  const { dispatchTheme, theme } = useContext(ThemeContext);

  const reducers = {
    game: dispatchGameData,
    settings: dispatchSettings,
    user: dispatchUserData,
    theme: dispatchTheme,
  };

  const [password, setPassword] = useState("111111");
  const [email, setEmail] = useState("test1@gmail.com");
  const [passwordHidden, setPasswordHidden] = useState(false);
  const [focus, setFocus] = useState(undefined);
  const [isKeyboardUp, setIsKeyboardUp] = useState(false);

  const enableSignUp =
    [password, email].filter((item) => item.length < 6).length === 0;

  const keyboardDidShow = () => {
    setIsKeyboardUp(true);
  };

  const keyboardDidHide = () => {
    setIsKeyboardUp(false);
    setFocus(undefined);
  };

  Keyboard.addListener("keyboardDidShow", keyboardDidShow);
  Keyboard.addListener("keyboardDidHide", keyboardDidHide);

  const handlePassword = (val) => setPassword(val);
  const handleEmail = (val) => setEmail(val);
  const handleFocus = (val) => {
    setFocus(val);
  };
  const toggleSecureEntry = () => setPasswordHidden(!passwordHidden);

  const pressLogin = () => {
    LogIn(email, password, email, navigation, reducers);
  };

  const INPUTS = [
    {
      name: "email",
      value: email,
      placeholder: "E-mail",
      type: "text",
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
  ];

  return (
    <>
      <SafeAreaView style={{ backgroundColor: "transparent", flex: 1 }}>
        <KeyboardAvoidingView
          behavior={"padding"}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
          }}
          keyboardShouldPersistTaps={"always"}
        >
          <Form2 theme={theme} isKeyboardUp={isKeyboardUp}>
            <Inputs2>
              {INPUTS.map((item) => {
                return (
                  <TEXT_INPUT
                    key={item.name}
                    valid={item.value.length > 5}
                    value={item.value}
                    input={item}
                    handleFocus={handleFocus}
                    focused={focus === item.name}
                  />
                );
              })}
              <AUTH_BUTTON
                type={enableSignUp ? "active" : "basic"}
                disabled={!enableSignUp}
                text={"log in"}
                action={() => pressLogin()}
                align={"center"}
                social={"mail"}
              />
              <AUTH_BUTTON
                text={"forgotten password"}
                action={() => navigation.navigate("forgotpassword")}
                type={"ghost"}
                align={"center"}
              />
            </Inputs2>
          </Form2>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
});
export default LOGIN;
