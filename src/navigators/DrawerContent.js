import React from "react";
import NAV_BUTTON from "../components/buttons/NavButton";
import { DrawerContent } from "./StyledNav";

const DRAWER_CONTENT = React.memo(
  ({ navigation, handleLeaveMatch, inactivePlayer, gameData, theme }) => {
    const DRAWER_ITEMS = [
      {
        route: "settings",
        icon: "tune",
        action: () => navigation.navigate("settings_ingame"),
      },
      {
        route: "stats",
        icon: "show-chart",
        action: () =>
          navigation.navigate("stats_ingame", {
            gameData,
            theme,
            back: "game",
          }),
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
          <NAV_BUTTON
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
  },
);

export default DRAWER_CONTENT;
