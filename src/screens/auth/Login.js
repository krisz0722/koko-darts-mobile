import React, { useContext, useState } from "react";
import { KeyboardAvoidingView, SafeAreaView } from "react-native";
import { Form2, Inputs2 } from "./StyledAuth";
import AUTH_BUTTON from "../../components/buttons/LoginButton";
import TEXT_INPUT from "../../components/buttons/TextInput";
import { ThemeContext } from "../../contexts/ThemeContext";
import LogIn from "../../utils/auth/authLogIn";
import { ErrorMessage } from "../contact/StyledContact";

const LOGIN = React.memo(({ navigation }) => {
  const { theme } = useContext(ThemeContext);

  const [password, setPassword] = useState("111111");
  const [email, setEmail] = useState("test1@gmail.com");
  const [passwordHidden, setPasswordHidden] = useState(false);
  const [focus, setFocus] = useState(undefined);
  const [error, setError] = useState(null);

  const handlePassword = (val) => {
    setError(null);
    setPassword(val);
  };
  const handleEmail = (val) => {
    setError(null);
    setEmail(val);
  };
  const handleFocus = (val) => {
    setFocus(val);
  };
  const toggleSecureEntry = () => setPasswordHidden(!passwordHidden);

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

  const enabled =
    [password, email].filter((item) => item.length < 6).length === 0;

  const regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gim;

  const validateForm = () => {
    if (!regexp.test(email)) {
      setError("the email you provided is invalid");
      return false;
    } else {
      return true;
    }
  };

  const pressLogin = async () => {
    if (validateForm()) {
      await LogIn(email, password, navigation);
    }
  };

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
          <Form2 theme={theme}>
            <ErrorMessage>{error}</ErrorMessage>
            <Inputs2>
              {INPUTS.map((item, i) => (
                <TEXT_INPUT
                  key={i}
                  valid={item.value.length > 5}
                  value={item.value}
                  input={item}
                  handleFocus={handleFocus}
                  focused={focus === item.name}
                />
              ))}
              <AUTH_BUTTON
                type={enabled ? "active" : "basic"}
                disabled={!enabled}
                text={"log in"}
                // action={() => pressLogin()}
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
