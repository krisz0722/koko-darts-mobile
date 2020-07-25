import React, { useContext } from "react";
import { HeaderText } from "../home/StyledHome";
import { ThemeContext } from "../../contexts/ThemeContext";
const TIMELINE = () => {
  const { theme } = useContext(ThemeContext);

  return <HeaderText theme={theme}>TIMELINE</HeaderText>;
};

export default TIMELINE;
