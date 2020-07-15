import React, { createContext, useState } from "react";

export const NavigationContext = createContext("");

export const NavigationContextProvider = (props) => {
  const [homeTabScreen, setHomeTabScreen] = useState("home");
  const [profileTabScreen, setProfileTabScreen] = useState("friends");

  return (
    <NavigationContext.Provider
      value={{
        profileTabScreen,
        setProfileTabScreen,
        homeTabScreen,
        setHomeTabScreen,
      }}
    >
      {props.children}
    </NavigationContext.Provider>
  );
};
