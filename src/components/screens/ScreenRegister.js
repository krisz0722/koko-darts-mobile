import React, { useContext, useState } from "react";
import { Keyboard, Dimensions, ScrollView, SafeAreaView } from "react-native";
import { SettingsContext } from "../../contexts/SettingsContext";
import {
  View_TopContainer,
  Form_Login,
  View_Headers,
  View_Inputs,
  Text_Title,
  Text_Subtitle,
  Scroll,
  TextInput_Login,
} from "../../components/screens/_styled/Styled_Register";
import {
  Button_Login,
  Button_Nav,
  NavBar,
  Text_Button,
  Text_Button_Login,
} from "../../components/navigation/Styled_Navigation";

export const REGISTER = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUp, setSignUp] = useState(false);

  const [focus, setFocus] = useState(undefined);
  const [isKeyboardUp, setIsKeyboardUp] = useState(false);

  const keyboardDidShow = (e) => {
    let newSize = Dimensions.get("window").height - e.endCoordinates.height;
    console.log(newSize);
    setIsKeyboardUp(true);
  };

  const keyboardDidHide = (e) => {
    let newSize = Dimensions.get("window").height;
    console.log(newSize);
    setIsKeyboardUp(false);
    setFocus(undefined);
  };

  Keyboard.addListener("keyboardDidShow", keyboardDidShow);
  Keyboard.addListener("keyboardDidHide", keyboardDidHide);

  console.log(isKeyboardUp);
  const handleUsername = (e) => setUserName(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const handleSignUp = (e) => {};

  const handleFocus = (e) => {
    setFocus(e);
  };

  return (
    <>
      <SafeAreaView>
        <Scroll style={styles.scroll}>
          <View_TopContainer theme={selectedTheme} isKeyboardUp={isKeyboardUp}>
            <View_Headers isKeyboardUp={isKeyboardUp}>
              <Text_Title theme={selectedTheme}>Welcome!</Text_Title>
              <Text_Subtitle theme={selectedTheme}>
                Sign up, save and sync your games on your computer or android
                device.
              </Text_Subtitle>
            </View_Headers>
            <Form_Login theme={selectedTheme} isKeyboardUp={isKeyboardUp}>
              <View_Inputs>
                <TextInput_Login
                  onFocus={() => handleFocus("username")}
                  focused={focus === "username"}
                  theme={selectedTheme}
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={handleUsername}
                  placeholder="Username"
                  placeholderTextColor={selectedTheme.borderColor}
                  selectionColor={"blue"}
                />
                <TextInput_Login
                  onFocus={() => handleFocus("password")}
                  focused={focus === "password"}
                  theme={selectedTheme}
                  type="password"
                  id="password"
                  value={password}
                  minLength={6}
                  placeholderTextColor={selectedTheme.borderColor}
                  onChange={handlePassword}
                  placeholder="Password"
                />

                <TextInput_Login
                  onFocus={() => handleFocus("confirm")}
                  focused={focus === "confirm"}
                  theme={selectedTheme}
                  type="password"
                  id="password"
                  value={confirmPassword}
                  placeholderTextColor={selectedTheme.borderColor}
                  minLength={6}
                  onChange={handleConfirmPassword}
                  placeholder="Confirm password"
                />
              </View_Inputs>
              <Button_Login theme={selectedTheme}>
                <Text_Button_Login theme={selectedTheme} id={"login"}>
                  {"Already registered? Click here to log in!"}
                </Text_Button_Login>
              </Button_Login>
            </Form_Login>
          </View_TopContainer>
          <NavBar theme={selectedTheme}>
            <Button_Nav theme={selectedTheme} onClick={handleSignUp}>
              <Text_Button theme={selectedTheme}>sign up</Text_Button>
            </Button_Nav>
            <Button_Nav theme={selectedTheme} onClick={handleSignUp}>
              <Text_Button theme={selectedTheme}>{"skip"}</Text_Button>
            </Button_Nav>
          </NavBar>
        </Scroll>
      </SafeAreaView>
    </>
  );
};

const styles = {
  scroll: {},
};
