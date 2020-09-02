import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, Keyboard, BackHandler } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import AUTH_BUTTON from "../../components/buttons/LoginButton";
import { CommonActions } from "@react-navigation/native";
import LoginInput from "../../components/buttons/TextInput";
import { Con, Con2, ErrorMessage, Title2, Title3 } from "./StyledContact";

const CONTACT = React.memo(({ navigation, filled }) => {
  const { theme } = useContext(ThemeContext);

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [focus, setFocus] = useState(undefined);
  const [isKeyboardUp, setIsKeyboardUp] = useState(false);
  const [error, setError] = useState(null);

  const keyboardDidHide = () => {
    setIsKeyboardUp(false);
    setFocus(undefined);
  };

  Keyboard.addListener("keyboardDidHide", keyboardDidHide);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("homenavigator");
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  const handleMessage = (val) => {
    setError(null);
    setMessage(val);
  };

  const handleSubject = (val) => {
    setError(null);
    setSubject(val);
  };

  const handleFocus = (val) => {
    if (val === "message") {
      setIsKeyboardUp(true);
    } else {
      setIsKeyboardUp(false);
    }
    setFocus(val);
  };

  const INPUT = {
    name: "message",
    value: message,
    placeholder: "Type your message here",
    type: "message",
    action: handleMessage,
  };

  const SUBJECT = {
    name: "subject",
    value: subject,
    placeholder: "Subject",
    type: "subject",
    action: handleSubject,
  };

  const enableSubmit = message.length > 0 && subject.length > 0;

  const validateForm = () => {
    if (subject.length < 5) {
      setError("subject must be at least 5 characters long");
      return false;
    } else if (subject.length > 30) {
      setError("subject must be shorter then 30 characters");
      return false;
    } else if (!message.length > 10) {
      setError("the message has to be at least 10 characters long.");
      return false;
    } else {
      return true;
    }
  };

  const send = () => {
    if (validateForm()) {
      alert("CLOUD FUNCTION - SEND CONTACT FORM MESSAGE");
      //TODO cloud function - send contact form message

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

    alert("CLOUD FUNCTION - SEND CONTACT FORM MESSAGE RPELY!!");
    //TODO cloud function - send contact form message REPLY!!
  };

  return (
    <SafeAreaView style={{ backgroundColor: "transparent", flex: 1 }}>
      <Con isKeyboardUp={isKeyboardUp} filled={filled}>
        <Title2 theme={theme}>Contact</Title2>
        <Con2>
          <Title3>{`submit the form or send an e-mail to \n asdasd@dev.com`}</Title3>
          <ErrorMessage>{error}</ErrorMessage>
          <LoginInput
            valid={subject.length > 5}
            input={SUBJECT}
            handleFocus={handleFocus}
            focused={focus === "subject"}
          />
          <LoginInput
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

export default CONTACT;
