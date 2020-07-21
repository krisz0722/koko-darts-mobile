import React from "react";
import ROUTER from "./src/screens/router/Router";
import { NavigationContextProvider } from "./src/contexts/NavigationContext";

console.disableYellowBox = true;

const App = () => {
  return (
    <NavigationContextProvider>
      <ROUTER />
    </NavigationContextProvider>
  );
};

export default App;

// 21.3.6528147
