import React, { createContext, useContext, useState } from "react";
import { OpacityContext } from "./OpacityContext";

export const InGameOpacityContext = createContext("");

export const InGameOpacityProvider = (props) => {
  const { opacity } = useContext(OpacityContext);

  const [inGameOpacity, setInGameOpacity] = useState(opacity);

  return (
    <InGameOpacityContext.Provider
      value={{
        inGameOpacity,
        setInGameOpacity,
      }}
    >
      {props.children}
    </InGameOpacityContext.Provider>
  );
};
