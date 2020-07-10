import React, { useContext, useState } from "react";
import {
  AppBackground,
  ScreenContainer,
} from "../components/containers/AppContainer";
import { SettingsContext } from "../contexts/SettingsContext";
import HomeNavigator from "../navigators/HomeNavigator";
import HOMENAVIGATOR_TAB from "../components/HomeNavigatorTab";
import { NavigationContext } from "../contexts/NavigationContext";
import AppNavigator from "../navigators/AppNavigator";

const ROUTER = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const { screen, showTab } = useContext(NavigationContext);

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
      {showTab ? <HOMENAVIGATOR_TAB /> : null}
    </>
  );
};

export default ROUTER;
