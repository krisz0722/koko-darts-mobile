import React from "react";
import { OverflowMenu } from "./StyledHome";
import NavButton from "../../components/buttons/NavButton";
import { logOut, deleteAccount } from "../../fb/auth";

const OVERFLOW_MENU = React.memo(({ navigation, username }) => {
  return (
    <OverflowMenu>
      <NavButton
        text={"about the app"}
        length={"auto"}
        active={false}
        direction={"row"}
        height={"auto"}
        icon={"info"}
        color={"dark"}
        action={() => alert("info")}
      />
      <NavButton
        text={"log out"}
        length={"auto"}
        active={false}
        direction={"row"}
        height={"auto"}
        icon={"exit-to-app"}
        color={"dark"}
        action={() => logOut(navigation)}
      />
      <NavButton
        text={"delete account"}
        length={"auto"}
        active={false}
        direction={"row"}
        height={"auto"}
        icon={"delete"}
        color={"dark"}
        action={() => deleteAccount(username, navigation)}
      />
    </OverflowMenu>
  );
});

export default OVERFLOW_MENU;
