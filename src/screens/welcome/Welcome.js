import React, { useContext } from "react";
import ShapeThrow from "../../../assets/shapeThrow";
import { View_Headers, View_Shape, View_Buttons } from "./StyledWelcome";
import { ThemeContext } from "../../contexts/ThemeContext";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";

const WELCOME = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <View_Headers theme={theme}></View_Headers>
      <View_Buttons>
        <THEMED_BUTTON type={"basic"} text={"sign up with google"} />
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
    </>
  );
};

export default WELCOME;
