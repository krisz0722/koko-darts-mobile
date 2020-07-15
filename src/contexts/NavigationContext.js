import React, { createContext, useState } from "react";

export const NavigationContext = createContext("");

export const NavigationContextProvider = (props) => {
  const [homeTabScreen, setHomeTabScreen] = useState("profile");
  const [profileTabScreen, setProfileTabScreen] = useState("matches");
  const [showTab, setShowTab] = useState(true);

  return (
    <NavigationContext.Provider
      value={{
        showTab,
        setShowTab,
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
