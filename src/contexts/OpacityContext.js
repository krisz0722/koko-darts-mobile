import React, { createContext, useState } from "react";

export const OpacityContext = createContext("");

export const OpacityProvider = (props) => {
  const [opacity, setOpacity] = useState(true);

  return (
    <OpacityContext.Provider
      value={{
        opacity,
        setOpacity,
      }}
    >
      {props.children}
    </OpacityContext.Provider>
  );
};
