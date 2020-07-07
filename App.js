import React from "react";
import { SettingsContextProvider } from "./src/contexts/SettingsContext";
import { GameContextProvider } from "./src/contexts/GameContext";
import SCREENS from "./src/components/Screens";
import {
  AppContainer,
  AppBackground,
} from "./src/components/Styled_ScreenContainer";

console.disableYellowBox = true;

const App = () => {
  return (
    <>
      <AppBackground
        source={require("./assets/bgPortrait.jpeg")}
        resizeMode="cover"
      />
      <SettingsContextProvider>
        <GameContextProvider>
          <AppContainer>
            <SCREENS />
          </AppContainer>
        </GameContextProvider>
      </SettingsContextProvider>
    </>
  );
};

export default App;
