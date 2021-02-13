import React from "react";
import { Name, Avatar, PlayerInfo } from "./StyledPlayers";

const PLAYER = React.memo(
  ({ player, name = true, theme, large = false, action = null, active }) => {
    const { img, key } = player;

    return (
      <PlayerInfo theme={theme} active={active} onPress={action}>
        <>
          <>
            {/assets/.test(img) || img === "" ? (
              <Avatar
                active={active}
                theme={theme}
                large={large}
                source={require("../../../assets/bg.png")}
              />
            ) : (
              <Avatar
                active={active}
                theme={theme}
                large={large}
                source={{ uri: img }}
              />
            )}
          </>
          {name ? (
            <Name active={active} theme={theme} large={large}>
              {key}
            </Name>
          ) : null}
        </>
      </PlayerInfo>
    );
  },
);
export default PLAYER;
