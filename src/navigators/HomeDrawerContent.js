import React from "react";
import { View } from "react-native";
import NavButton from "../components/buttons/NavButton";
import styled from "styled-components";
import { FlexCol } from "../styles/css_mixins";

export const HomeDrawerContent = styled(View)`
  ${FlexCol};
  width: 100%;
  top: 0%;
  background-color: ${({ theme }) => theme.bgOverlay};
`;

const HOME_DRAWER_CONTENT = ({ logOut, deleteAccount, navigation, theme }) => {
  const HOME_DRAWER_ITEMS = [
    {
      route: "about",
      icon: "info",
      action: () => navigation.navigate("about"),
    },
    {
      route: "report bug",
      icon: "bug-report",
      action: () => navigation.navigate("report"),
    },
    {
      route: "contact",
      icon: "mail",
      action: () => navigation.navigate("contact"),
    },
    {
      route: "log out",
      icon: "exit-to-app",
      action: () => logOut(),
    },
    {
      route: "delete account",
      icon: "delete",
      action: deleteAccount,
    },
  ];

  return (
    <HomeDrawerContent theme={theme}>
      {HOME_DRAWER_ITEMS.map((item) => (
        <NavButton
          key={item.route}
          color={"light"}
          height={10}
          length={2}
          direction={"row"}
          text={item.route}
          icon={item.icon}
          action={item.action}
          inGameTheme={theme}
          type={"drawer"}
        />
      ))}
    </HomeDrawerContent>
  );
};

export default HOME_DRAWER_CONTENT;
