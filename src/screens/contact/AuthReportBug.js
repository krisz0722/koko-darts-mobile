import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, BackHandler, Keyboard } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import AUTH_BUTTON from "../../components/buttons/LoginButton";
import { CommonActions } from "@react-navigation/native";
import { Con, Con2, Title2 } from "./StyledContact";
import LoginInput from "../../components/buttons/TextInput";

const AUTH_CONTACT = React.memo(({ navigation, filled }) => {
  const { theme } = useContext(ThemeContext);

  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [focus, setFocus] = useState(undefined);
  const [isKeyboardUp, setIsKeyboardUp] = useState(false);

  const keyboardDidShow = (e) => {
    setIsKeyboardUp(true);
  };

  const keyboardDidHide = (e) => {
    setIsKeyboardUp(false);
    setFocus(undefined);
  };

  const handleFocus = (val) => {
    setFocus(val);
  };

  Keyboard.addListener("keyboardDidShow", keyboardDidShow);
  Keyboard.addListener("keyboardDidHide", keyboardDidHide);

  useEffect(() => {
    const backAction = () => {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: "authnavigator",
            },
          ],
        }),
      );
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  const send = () =>
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: "authnavigator",
          },
        ],
      }),
    );

  const handleEmail = (val) => {
    setEmail(val);
  };

  const handleMessage = (val) => {
    setMessage(val);
  };

  const INPUT = {
    name: "message",
    value: message,
    placeholder: "type your message here",
    type: "message",
    action: handleMessage,
  };

  const EMAIL = {
    name: "email",
    value: email,
    placeholder: "email",
    type: "email",
    action: handleEmail,
  };

  const enableSubmit = email.length > 6 && message.length > 0;

  return (
    <SafeAreaView style={{ backgroundColor: "transparent", flex: 1 }}>
      <Con isKeyboardUp={isKeyboardUp} filled={filled}>
        <Title2 theme={theme}>report a bug</Title2>
        <Con2>
          <LoginInput
            //TODO email regexp
            valid={email.length > 5}
            input={EMAIL}
            handleFocus={handleFocus}
            focused={focus === "email"}
          />
          <LoginInput
            //TODO email regexp
            valid={message.length > 5}
            input={INPUT}
            handleFocus={handleFocus}
            focused={focus === "message"}
            multiline={true}
          />
          <AUTH_BUTTON
            disabled={!enableSubmit}
            type={enableSubmit ? "active" : "basic"}
            text={"send"}
            action={() => send()}
            align={"center"}
            social={"send"}
          />
        </Con2>
      </Con>
    </SafeAreaView>
  );
});
export default AUTH_CONTACT;
