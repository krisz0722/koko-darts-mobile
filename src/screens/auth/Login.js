import React, { useEffect, useContext, useState } from "react";
import { Keyboard, KeyboardAvoidingView, SafeAreaView } from "react-native";
import { Buttons, Form2, Inputs } from "./StyledAuth";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import LoginInput from "../../components/buttons/LoginInput";
import { ThemeContext } from "../../contexts/ThemeContext";
import { LogIn } from "../../fb/auth";
import { Authcontext } from "../../contexts/AuthContext";
import { SettingsContext } from "../../contexts/SettingsContext";
import { GameContext } from "../../contexts/GameContext";
import ACTIVITY_INDICATOR from "../../components/modals/Activityindicator";
import auth from "@react-native-firebase/auth";

const LOGIN = ({ navigation }) => {
  const { theme, setSelectedTheme, setAnimation, setBackground } = useContext(
    ThemeContext,
  );
  const { dispatchGameData } = useContext(GameContext);
  const { dispatchSettings } = useContext(SettingsContext);
  const { dispatchUserData, userData } = useContext(Authcontext);

  const reducers = {
    game: dispatchGameData,
    settings: dispatchSettings,
    user: dispatchUserData,
    theme: setSelectedTheme,
    animation: setAnimation,
    background: setBackground,
  };

  const [password, setPassword] = useState("111111");
  const [email, setEmail] = useState("test1@gmail.com");
  const [passwordHidden, setPasswordHidden] = useState(false);
  const [focus, setFocus] = useState(undefined);
  const [isKeyboardUp, setIsKeyboardUp] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      setLoading(false);
    }
  }, [userData]);

  const enableSignUp =
    [password, email].filter((item) => item.length < 6).length === 0;

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
  const handleEmail = (val) => setEmail(val);
  const handleFocus = (val) => {
    setFocus(val);
  };
  const toggleSecureEntry = () => setPasswordHidden(!passwordHidden);

  const pressLogin = () => {
    setLoading(true);
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

  const user = auth().currentUser;

  return (
    <>
      {loading ? (
        <ACTIVITY_INDICATOR text="logging in..." theme={theme} size="large" />
      ) : (
        <>
          {user ? null : (
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
                  <Inputs>
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
                  </Inputs>
                  <THEMED_BUTTON
                    type={enableSignUp ? "active" : "basic"}
                    disabled={!enableSignUp}
                    text={"log in"}
                    action={() => pressLogin()}
                  />
                  <Buttons>
                    <THEMED_BUTTON
                      text={"forgotten password"}
                      action={() => navigation.navigate("forgotpassword")}
                      type={"ghost"}
                    />
                  </Buttons>
                </Form2>
              </KeyboardAvoidingView>
            </SafeAreaView>
          )}
        </>
      )}
    </>
  );
};
export default LOGIN;
