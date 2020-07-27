import React from "react";
import { ThemeContextProvider } from "./src/contexts/ThemeContext";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { ImageBackground } from "react-native";
import { Window } from "./src/styles/css_mixins";
import AppNavigator from "./src/navigators/AppNavigator";

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
        <AppNavigator />
      </ThemeContextProvider>
    </>
  );
};

export default App;

//TODO SOLVED make stacknavigation off when animation is off
//TODO SOLVED swap player does not owrk
//TODO SOLVED change opponent play with guest does not work
//TODO SOLVED when typing inputbydart and THEN CHANGE method , set the score back
//TODO SOLVED remoing opacity provider
//TODO SOLVED change opponent fontsize problem --> later
//TODO SOLVED setDrawer function error
//TODO SOLVED turn drawer gesture off
//TODO SOLVED score animation does not work

//TODO next throws rules of hooks error -> know how to fix
//TODO dont show homneavigator until all the components are mounted --> later
//TODO score can go below 0 !!!!!! validation fix is required in NEXT and SUBMIT functions!

//TODO finish auth screens
//TODO auth screen regexp and info text
