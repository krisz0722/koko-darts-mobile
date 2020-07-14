import React, { useContext } from "react";
import { ScreenContainer } from "../components/containers/AppContainer";
import { SettingsContext } from "../contexts/SettingsContext";
import HOMENAVIGATOR_TAB from "../components/HomeNavigatorTab";
import { NavigationContext } from "../contexts/NavigationContext";
import AppNavigator from "../navigators/AppNavigator";
import { ThemeProvider } from "styled-components";
import { AppBackground } from "../components/containers/AppContainer";
import HOME from "./Home";

const ROUTER = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const { screen, showTab } = useContext(NavigationContext);

  const theme = selectedTheme;

  return (
    <>
      <AppBackground
        source={require("../../assets/bgPortrait.jpeg")}
        resizeMode="cover"
      />
      <ThemeProvider theme={theme}>
        <ScreenContainer screen={screen} theme={theme}>
          <AppNavigator />
        </ScreenContainer>
        {/*<HOME />*/}
      </ThemeProvider>

      {showTab ? <HOMENAVIGATOR_TAB /> : null}
    </>
  );
};

export default ROUTER;
