import React from "react";
import AppNavigator from "../../navigators/AppNavigator";
import { AppBackground } from "./StyledRouter";
import { SettingsContextProvider } from "../../contexts/SettingsContext";
import { ThemeContextProvider } from "../../contexts/ThemeContext";

const ROUTER = () => {
  console.log("ROUTER RENDER");
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
