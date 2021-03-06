import React from "react";
import { ThemeContextProvider } from "./src/contexts/ThemeContext";
import styled from "styled-components/native";
import { ImageBackground } from "react-native";
import { Window } from "./src/styles/css_mixins";
import APP_NAVIGATOR from "./src/navigators/AppNavigator";
import { AuthcontextProvider } from "./src/contexts/AuthContext";
import { GameContextProvider } from "./src/contexts/GameContext";
import { SettingsContextProvider } from "./src/contexts/SettingsContext";

export const AppBackground = styled(ImageBackground)`
  width: ${() => Window.width};
  height: ${() => Window.height};
  position: absolute;
  background-color: transparent;
  top: 0;
`;

console.disableYellowBox = true;

const App = () => {
  return (
    <>
      <ThemeContextProvider>
        <AuthcontextProvider>
          <SettingsContextProvider>
            <GameContextProvider>
              <APP_NAVIGATOR />
            </GameContextProvider>
          </SettingsContextProvider>
        </AuthcontextProvider>
      </ThemeContextProvider>
    </>
  );
};

export default App;
