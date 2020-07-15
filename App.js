import React from "react";
import { SettingsContextProvider } from "./src/contexts/SettingsContext";
import { GameContextProvider } from "./src/contexts/GameContext";
import ROUTER from "./src/screens/router/Router";
import { AppBackground } from "./src/screens/router/StyledRouter";
import { NavigationContextProvider } from "./src/contexts/NavigationContext";

console.disableYellowBox = true;

const App = () => {
  return (
    <NavigationContextProvider>
      <SettingsContextProvider>
        <GameContextProvider>
          <ROUTER />
        </GameContextProvider>
      </SettingsContextProvider>
    </NavigationContextProvider>
  );
};

export default App;

// 21.3.6528147
