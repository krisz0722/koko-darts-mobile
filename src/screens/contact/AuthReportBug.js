import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, BackHandler, Keyboard } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import AUTH_BUTTON from "../../components/buttons/LoginButton";
import { CommonActions } from "@react-navigation/native";
import { Con, Con2, ErrorMessage, Title2, Title3 } from "./StyledContact";
import LoginInput from "../../components/buttons/TextInput";

const AUTH_CONTACT = React.memo(({ navigation, filled }) => {
  const { theme } = useContext(ThemeContext);

  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [focus, setFocus] = useState(undefined);
  const [isKeyboardUp, setIsKeyboardUp] = useState(false);
  const [error, setError] = useState(null);

  const keyboardDidHide = () => {
    setIsKeyboardUp(false);
    setFocus(undefined);
  };

  Keyboard.addListener("keyboardDidHide", keyboardDidHide);

  const handleFocus = (val) => {
    if (val === "message") {
      setIsKeyboardUp(true);
    } else {
      setIsKeyboardUp(false);
    }
    setFocus(val);
  };

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

  const handleEmail = (val) => {
    setEmail(val);
    setError(null);
  };

  const handleMessage = (val) => {
    setMessage(val);
    setError(null);
  };

  const INPUT = {
    name: "message",
    value: message,
    placeholder: "Type your message here",
    type: "message",
    action: handleMessage,
  };

  const EMAIL = {
    name: "email",
    value: email,
    placeholder: "Your E-mail",
    type: "email",
    action: handleEmail,
  };

  const enabled = email.length > 5 && message.length >= 10;

  const regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gim;

  const validateSubmit = () => {
    if (!regexp.test(email)) {
      setError("the e-mail you provided is invalid");
      return false;
    } else if (!message.length > 10) {
      setError("the message has to be at least 10 characters long.");
      return false;
    } else {
      return true;
    }
  };

  const send = () => {
    if (validateSubmit()) {
      alert("CLOUD FUNCTION - SEND AUTHENTICATION BUG REPORT ");
      //TODO cloud function - auth bug report

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
    }

    alert("CLOUD FUNCTION - SEND AUTHENTICATION BUG REPORT REPLY!!!! ");
    //TODO cloud function - send auth bug report REPLY!!
  };

  return (
    <SafeAreaView style={{ backgroundColor: "transparent", flex: 1 }}>
      <Con isKeyboardUp={isKeyboardUp} filled={filled}>
        <Title2 theme={theme}>report a bug</Title2>
        <Con2>
          <Title3>{`submit the form or send an e-mail to \n asdasd@dev.com`}</Title3>
          <ErrorMessage>{error}</ErrorMessage>
          <LoginInput
            valid={regexp.test(email)}
            input={EMAIL}
            handleFocus={handleFocus}
            focused={focus === "email"}
          />
          <LoginInput
            valid={message.length > 5}
            input={INPUT}
            handleFocus={handleFocus}
            focused={focus === "message"}
            multiline={true}
          />
          <AUTH_BUTTON
            disabled={!enabled}
            type={enabled ? "active" : "basic"}
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
