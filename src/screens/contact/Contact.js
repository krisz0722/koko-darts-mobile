import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, Keyboard, BackHandler } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import AUTH_BUTTON from "../../components/buttons/LoginButton";
import { CommonActions } from "@react-navigation/native";
import OPTION_BUTTON from "../../components/buttons/OptionButton";
import LoginInput from "../../components/buttons/TextInput";
import { Con, Options, Title2 } from "./StyledReportBug";

const CONTACT = React.memo(({ navigation, filled }) => {
  const { theme } = useContext(ThemeContext);

  const [subject, setSubject] = useState("report bug");
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

  const INPUT = {
    name: "message",
    value: message,
    placeholder: "type your message here",
    type: "message",
    action: handleMessage,
  };

  const DATA = ["report bug", "general", "collab"];

  const enableSubmit = message.length > 0;

  return (
    <SafeAreaView style={{ backgroundColor: "transparent", flex: 1 }}>
      <Con isKeyboardUp={isKeyboardUp} filled={filled}>
        <Title2 theme={theme}>Choose a subject</Title2>
        <Options theme={theme}>
          {DATA.map((item) => (
            <OPTION_BUTTON
              key={item}
              value={item}
              active={subject === item}
              length={DATA.length}
              action={() => setSubject(item)}
              inGameTheme={theme}
            />
          ))}
        </Options>
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
      </Con>
    </SafeAreaView>
  );
});

export default CONTACT;
