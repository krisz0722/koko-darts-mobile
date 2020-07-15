import React, { useContext } from "react";
import { ScreenContainer } from "./StyledRouter";
import { SettingsContext } from "../../contexts/SettingsContext";
import { NavigationContext } from "../../contexts/NavigationContext";
import AppNavigator from "../../navigators/AppNavigator";
import { ThemeProvider } from "styled-components";
import { AppBackground } from "./StyledRouter";

const ROUTER = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const { screen } = useContext(NavigationContext);

  const theme = selectedTheme;

  return (
    <>
      <AppBackground
        source={require("../../../assets/bgPortrait.jpeg")}
        resizeMode="cover"
      />
      <ThemeProvider theme={theme}>
        <ScreenContainer screen={screen} theme={theme}>
          <AppNavigator />
        </ScreenContainer>
      </ThemeProvider>
    </>
  );
};

export default ROUTER;
