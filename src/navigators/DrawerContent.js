import React from "react";
import { View } from "react-native";
import NavButton from "../components/buttons/NavButton";
import styled from "styled-components";
import { FlexCol } from "../styles/css_mixins";

export const DrawerContent = styled(View)`
  ${FlexCol};
  width: 100%;
  top: 30%;
  height: 40%;
  background-color: ${({ theme, inap }) => theme.game[inap + "Bg"]};
`;

const DRAWER_CONTENT = ({
  navigation,
  handleLeaveMatch,
  inactivePlayer,
  gameData,
  theme,
}) => {
  const DRAWER_ITEMS = [
    {
      route: "settings",
      icon: "tune",
      action: () => navigation.navigate("settings-ingame"),
    },
    {
      route: "stats",
      icon: "show-chart",
      action: () =>
        navigation.navigate("stats", { gameData, theme, back: "game" }),
    },
    {
      route: "home",
      icon: "home",
      action: () => handleLeaveMatch(),
    },
  ];

  return (
    <DrawerContent theme={theme} inap={inactivePlayer}>
      {DRAWER_ITEMS.map((item) => (
        <NavButton
          key={item.route}
          color={"drawer"}
          height={10}
          length={3}
          direction={"row"}
          text={item.route}
          icon={item.icon}
          action={item.action}
          inap={inactivePlayer}
          inGameTheme={theme}
          type={"drawer"}
        />
      ))}
    </DrawerContent>
  );
};

export default DRAWER_CONTENT;
