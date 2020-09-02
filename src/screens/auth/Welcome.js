import React, { useContext, useEffect, useState } from "react";
import ShapeThrow from "../../../assets/shapeThrow";
import { View_Headers, View_Shape, View_Buttons } from "./StyledWelcome";
import { ThemeContext } from "../../contexts/ThemeContext";
import AUTH_BUTTON from "../../components/buttons/LoginButton";
import signUpGoogle from "../../_backend/auth/authSignInGoogle";
import signUpFacebook from "../../_backend/auth/authSignUpFacebook";
import { GameContext } from "../../contexts/GameContext";
import { SettingsContext } from "../../contexts/SettingsContext";
import { Authcontext } from "../../contexts/AuthContext";
import auth from "@react-native-firebase/auth";
import { SafeAreaView } from "react-native";

const WELCOME = React.memo(({ navigation }) => {
  const { dispatchGameData } = useContext(GameContext);
  const { dispatchSettings } = useContext(SettingsContext);
  const { dispatchUserData } = useContext(Authcontext);
  const { dispatchTheme, theme } = useContext(ThemeContext);

  const reducers = {
    game: dispatchGameData,
    settings: dispatchSettings,
    user: dispatchUserData,
    theme: dispatchTheme,
  };

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

  const pressGoogleSignUp = () => {
    setLoading(true);
    signUpGoogle(navigation, reducers);
  };

  const pressSignUpFacebook = () => {
    setLoading(true);
    signUpFacebook(navigation, reducers);
  };

  return (
    <>
      {user && loading ? null : (
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
      )}
    </>
  );
});

export default WELCOME;