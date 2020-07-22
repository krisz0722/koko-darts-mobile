import React from "react";
import AppNavigator from "../../navigators/AppNavigator";
import { AppBackground } from "./StyledRouter";
import { ThemeContextProvider } from "../../contexts/ThemeContext";

const ROUTER = () => {
  return (
    <>
      <AppBackground
        source={require("../../../assets/bgPortrait.jpeg")}
        resizeMode="cover"
      />
      <ThemeContextProvider>
        <AppNavigator />
      </ThemeContextProvider>
    </>
  );
};

export default ROUTER;
