import React, { useContext } from "react";
import NAV_BUTTON from "../components/buttons/NavButton";
import { ThemeContext } from "../contexts/ThemeContext";
import { NavBar } from "./StyledNav";

const BOTTOM_TABBAR_CONTENT = React.memo((props) => {
  const { theme } = useContext(ThemeContext);

  const { state, navigation } = props;

  const TABBAR_ITEMS = [
    {
      index: 0,
      route: "home",
      icon: "home",
      action: () => navigation.navigate("home"),
    },
    {
      index: 1,
      route: "settings",
      icon: "tune",
      action: () => navigation.navigate("settings"),
    },
    {
      index: 2,
      route: "profile",
      icon: "person",
      action: () => navigation.navigate("profile"),
    },
  ];

  const index = state.index;

  return (
    <>
      {index === 3 || index === 4 ? null : (
        <NavBar position={"bottom"} theme={theme}>
          {TABBAR_ITEMS.map((item) => (
            <NAV_BUTTON
              key={item.route}
              length={3}
              direction={"column"}
              text={item.route}
              icon={item.icon}
              action={item.action}
              active={index === item.index}
            />
          ))}
        </NavBar>
      )}
    </>
  );
});

export default BOTTOM_TABBAR_CONTENT;
