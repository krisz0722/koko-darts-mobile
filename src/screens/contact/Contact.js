import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, Keyboard, BackHandler } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import AUTH_BUTTON from "../../components/buttons/LoginButton";
import { CommonActions } from "@react-navigation/native";
import LoginInput from "../../components/buttons/TextInput";
import { Con, Con2, Title2 } from "./StyledContact";

const CONTACT = React.memo(({ navigation, filled }) => {
  const { theme } = useContext(ThemeContext);

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
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
      navigation.navigate("homenavigator");
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

  const handleMessage = (val) => {
    setMessage(val);
  };

  const handleSubject = (val) => {
    setSubject(val);
  };

  const INPUT = {
    name: "message",
    value: message,
    placeholder: "type your message here",
    type: "message",
    action: handleMessage,
  };

  const SUBJECT = {
    name: "subject",
    value: subject,
    placeholder: "subject",
    type: "subject",
    action: handleSubject,
  };

  const enableSubmit = message.length > 0 && subject.length > 0;

  return (
    <SafeAreaView style={{ backgroundColor: "transparent", flex: 1 }}>
      <Con isKeyboardUp={isKeyboardUp} filled={filled}>
        <Title2 theme={theme}>Contact</Title2>
        <Con2>
          <LoginInput
            //TODO email regexp
            valid={subject.length > 5}
            input={SUBJECT}
            handleFocus={handleFocus}
            focused={focus === "subject"}
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

export default CONTACT;
