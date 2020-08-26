import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import { Buttons, Form, Inputs } from "./StyledAuth";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import LoginInput from "../../components/buttons/LoginInput";
import { ThemeContext } from "../../contexts/ThemeContext";
import signUp from "../../_backend/auth/authSignUpEmail";
import { Authcontext } from "../../contexts/AuthContext";
import { SettingsContext } from "../../contexts/SettingsContext";
import { GameContext } from "../../contexts/GameContext";
import ACTIVITY_INDICATOR from "../../components/modals/Activityindicator";
import auth from "@react-native-firebase/auth";

const REGISTER = ({ navigation }) => {
  const { theme, setSelectedTheme, setAnimation, setBackground } = useContext(
    ThemeContext,
  );

  const { dispatchSettings } = useContext(SettingsContext);
  const { dispatchGameData } = useContext(GameContext);
  const { dispatchUserData } = useContext(Authcontext);

  const reducers = {
    game: dispatchGameData,
    settings: dispatchSettings,
    user: dispatchUserData,
    theme: setSelectedTheme,
    animation: setAnimation,
    background: setBackground,
  };

  const [username, setUsername] = useState("test_01");
  const [email, setEmail] = useState("test1@gmail.com");
  const [password, setPassword] = useState("111111");
  const [confirmPassword, setConfirmPassword] = useState("111111");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [focus, setFocus] = useState(undefined);
  const [isKeyboardUp, setIsKeyboardUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  auth().onAuthStateChanged((user) => {
    setUser(user);
  });

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  const pressSignUp = () => {
    setLoading(true);
    signUp(email, password, username, navigation, reducers);
  };

  const enableSignUp =
    [email, password, username, confirmPassword].filter(
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

  const handleUsername = (val) => setUsername(val);
  const handleEmail = (val) => setEmail(val);
  const handlePassword = (val) => setPassword(val);
  const handleConfirmPassword = (val) => setConfirmPassword(val);
  const handleFocus = (val) => {
    setFocus(val);
  };
  const toggleSecureEntry = () => setPasswordHidden(!passwordHidden);

  const INPUTS = [
    {
      name: "username",
      value: username,
      placeholder: "username",
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
      name: "confirm",
      value: confirmPassword,
      placeholder: "Confirm password",
      type: "password",
      action: handleConfirmPassword,
      icon: passwordHidden ? "visibility" : "visibility-off",
      iconAction: toggleSecureEntry,
    },
  ];

  return (
    <>
      {loading ? (
        <ACTIVITY_INDICATOR
          text="signing in with email..."
          theme={theme}
          size="large"
        />
      ) : (
        <>
          {user && loading ? null : (
            <SafeAreaView style={{ backgroundColor: "transparent", flex: 1 }}>
              <KeyboardAvoidingView
                behavior={"padding"}
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: "center",
                }}
                keyboardShouldPersistTaps={"always"}
              >
                <Text>valami</Text>
                <Form theme={theme} isKeyboardUp={isKeyboardUp}>
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
                    <THEMED_BUTTON
                      type={enableSignUp ? "active" : "basic"}
                      disabled={!enableSignUp}
                      text={"Sign Up"}
                      action={() => pressSignUp()}
                    />
                  </Inputs>
                  <Buttons>
                    <THEMED_BUTTON
                      text={"Already have an account?\ntap here to log in!"}
                      action={() => navigation.navigate("login")}
                      type={"ghost"}
                    />
                  </Buttons>
                </Form>
              </KeyboardAvoidingView>
            </SafeAreaView>
          )}
        </>
      )}
    </>
  );
};

export default REGISTER;
