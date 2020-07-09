import React, { useContext } from "react";
import {
  AppBackground,
  ScreenContainer,
} from "../components/containers/AppContainer";
import { SettingsContext } from "../contexts/SettingsContext";
import AppNavigator from "../navigators/AppNavigator";

const ROUTER = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);
  return (
    <>
      <AppBackground
        source={require("../../assets/bgPortrait.jpeg")}
        resizeMode="cover"
        theme={selectedTheme}
      />
      <ScreenContainer theme={selectedTheme}>
        <AppNavigator />
      </ScreenContainer>
    </>
  );
};

export default ROUTER;
