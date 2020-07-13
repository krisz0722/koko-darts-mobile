import React from "react";
import { SettingsContextProvider } from "./src/contexts/SettingsContext";
import { GameContextProvider } from "./src/contexts/GameContext";
import ROUTER from "./src/screens/Router";
import { AppBackground } from "./src/components/containers/AppContainer";
import { NavigationContextProvider } from "./src/contexts/NavigationContext";

console.disableYellowBox = true;

const App = () => {
  return (
    <>
      <AppBackground
        source={require("./assets/bgPortrait.jpeg")}
        resizeMode="cover"
      />
      <NavigationContextProvider>
        <SettingsContextProvider>
          <GameContextProvider>
            <ROUTER />
          </GameContextProvider>
        </SettingsContextProvider>
      </NavigationContextProvider>
    </>
  );
};

export default App;

// 21.3.6528147
