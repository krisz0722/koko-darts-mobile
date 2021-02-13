import React from "react";
import NAV_BUTTON from "../components/buttons/NavButton";
import { HomeDrawerContent } from "./StyledNav";

const HOME_DRAWER_CONTENT = React.memo(
  ({ logOut, deleteAccount, navigation, theme }) => {
    const HOME_DRAWER_ITEMS = [
      {
        route: "about",
        icon: "info",
        action: () => navigation.navigate("about"),
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
          <NAV_BUTTON
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
  },
);

export default HOME_DRAWER_CONTENT;
