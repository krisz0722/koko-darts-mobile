import React, { useContext, useEffect, useState } from "react";
import ShapeThrow from "../../../assets/shapeThrow";
import { View_Headers, View_Shape, View_Buttons } from "./StyledWelcome";
import { ThemeContext } from "../../contexts/ThemeContext";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import { signUpGoogle } from "../../fb/auth";
import { GameContext } from "../../contexts/GameContext";
import { SettingsContext } from "../../contexts/SettingsContext";
import { Authcontext } from "../../contexts/AuthContext";
import auth from "@react-native-firebase/auth";
import ACTIVITY_INDICATOR from "../../components/modals/Activityindicator";
import { SafeAreaView } from "react-native";

const WELCOME = ({ navigation }) => {
  const { theme, setSelectedTheme, setAnimation, setBackground } = useContext(
    ThemeContext,
  );
  const { dispatchGameData } = useContext(GameContext);
  const { dispatchSettings } = useContext(SettingsContext);
  const { dispatchUserData } = useContext(Authcontext);

  const reducers = {
    game: dispatchGameData,
    settings: dispatchSettings,
    user: dispatchUserData,
    theme: setSelectedTheme,
    animation: setAnimation,
    background: setBackground,
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

  return (
    <>
      {loading ? (
        <ACTIVITY_INDICATOR
          text="signing in with google..."
          theme={theme}
          size="large"
        />
      ) : (
        <>
          {user && loading ? null : (
            <SafeAreaView style={{ backgroundColor: "transparent", flex: 1 }}>
              <View_Headers theme={theme}></View_Headers>
              <View_Buttons>
                <THEMED_BUTTON
                  action={() => pressGoogleSignUp()}
                  type={"basic"}
                  text={"sign up with google"}
                />
                <THEMED_BUTTON type={"basic"} text={"sign up with facebook"} />
                <THEMED_BUTTON
                  type={"basic"}
                  text={"sign up with email"}
                  action={() => navigation.navigate("register")}
                />
                <THEMED_BUTTON
                  text={"Already have an account?\ntap here to log in!"}
                  action={() => navigation.navigate("login")}
                  type={"ghost"}
                />
              </View_Buttons>
              <View_Shape theme={theme}>
                <ShapeThrow fill={theme.bgActive} />
              </View_Shape>
            </SafeAreaView>
          )}
        </>
      )}
    </>
  );
};

export default WELCOME;
