import React from "react";
import { SettingsContextProvider } from "./src/contexts/SettingsContext";
import { GameContextProvider } from "./src/contexts/GameContext";
import ROUTER from "./src/screens/Router";
import {
  AppContainer,
  AppBackground,
} from "./src/components/containers/AppContainer";

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
          <ROUTER />
        </GameContextProvider>
      </SettingsContextProvider>
    </>
  );
};

export default App;
