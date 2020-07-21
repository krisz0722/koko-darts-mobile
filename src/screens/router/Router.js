import React from "react";
import AppNavigator from "../../navigators/AppNavigator";
import { AppBackground } from "./StyledRouter";

const ROUTER = () => {
  console.log("ROUTER RENDER");
  return (
    <>
      <AppBackground
        source={require("../../../assets/bgPortrait.jpeg")}
        resizeMode="cover"
      />
      <AppNavigator />
    </>
  );
};

export default ROUTER;
