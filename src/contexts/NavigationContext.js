import React, { createContext, useState } from "react";

export const NavigationContext = createContext("");

export const NavigationContextProvider = (props) => {
  const [screen, setScreen] = useState("");
  const [showTab, setShowTab] = useState(false);

  return (
    <NavigationContext.Provider
      value={{ showTab, setShowTab, screen, setScreen }}
    >
      {props.children}
    </NavigationContext.Provider>
  );
};
