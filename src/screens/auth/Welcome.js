import React, { useContext } from "react";
import ShapeThrow from "../../../assets/shapeThrow";
import { View_Headers, View_Shape, View_Buttons } from "./StyledWelcome";
import { ThemeContext } from "../../contexts/ThemeContext";
import AUTH_BUTTON from "../../components/buttons/LoginButton";
import signUpGoogle from "../../_auth/authSignInGoogle";
import signUpFacebook from "../../_auth/authSignUpFacebook";
import { SafeAreaView } from "react-native";

const WELCOME = React.memo(({ navigation }) => {
  const { theme } = useContext(ThemeContext);

  const pressGoogleSignUp = () => {
    signUpGoogle(navigation);
  };

  const pressSignUpFacebook = () => {
    signUpFacebook(navigation);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "transparent", flex: 1 }}>
      <View_Headers theme={theme} />
      <View_Buttons>
        <AUTH_BUTTON
          icon={"google"}
          action={() => pressGoogleSignUp()}
          type={"active"}
          text={"sign up with google"}
          social={"google"}
        />
        <AUTH_BUTTON
          type={"basic"}
          text={"sign up with facebook"}
          action={() => pressSignUpFacebook()}
          social={"facebook"}
          fill={"#475993"}
        />
        <AUTH_BUTTON
          type={"basic"}
          text={"sign up with email"}
          action={() => navigation.navigate("register")}
          social={"email"}
        />
        <AUTH_BUTTON
          text={"Already have an account?\ntap here to log in!"}
          action={() => navigation.navigate("login")}
          type={"ghost"}
          align={"center"}
        />
      </View_Buttons>
      <View_Shape theme={theme}>
        <ShapeThrow fill={theme.bgActive} />
      </View_Shape>
    </SafeAreaView>
  );
});

export default WELCOME;
