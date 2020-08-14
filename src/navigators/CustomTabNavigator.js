import React, { useContext } from "react";
import NavButton from "../components/buttons/NavButton";
import styled from "styled-components";
import { View } from "react-native";
import { BorderVertical, FlexRowAround, Window } from "../styles/css_mixins";
import { ThemeContext } from "../contexts/ThemeContext";
import { GameContext } from "../contexts/GameContext";

export const NavBar = styled(View)`
  ${BorderVertical(({ theme, color }) =>
    color === "dark" ? theme.bg3 : theme.borderColor,
  )};
  border-bottom-width: ${({ theme, position }) =>
    position === "top" ? theme.borderWidth : 0};
  position: ${({ position }) => (position === "top" ? "relative" : "absolute")};
  bottom: 0;
  width: 100%;
  height: ${() => Window.height * 0.08};
  ${FlexRowAround};
`;

const CUSTOM_TAB_NAVIGATOR = ({ tabs }) => {
  const { theme } = useContext(ThemeContext);
  const {
    gameData: { inactivePlayer },
  } = useContext(GameContext);

  return (
    <NavBar theme={theme}>
      {tabs.map((item) => (
        <NavButton
          key={item.route}
          color={"dark"}
          height={10}
          length={3}
          direction={"row"}
          text={item.text}
          icon={item.icon}
          action={item.action}
          inap={inactivePlayer}
        />
      ))}
    </NavBar>
  );
};

export default CUSTOM_TAB_NAVIGATOR;
