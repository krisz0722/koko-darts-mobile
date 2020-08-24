import React from "react";
import { Name, Avatar, Players2, PlayerInfo2, Main2, Sub } from "./StyledStats";
import { ActivityIndicator } from "react-native";
const STATS2 = React.memo(({ username, theme, gameData, lastMatch }) => {
  const p1 = lastMatch ? gameData.p1 : gameData.settings.p1;
  const p2 = lastMatch ? gameData.p2 : gameData.settings.p2;
  const text = lastMatch
    ? `you finished a game against \n${gameData.opponent}\n Currently initializing rematch on your opponents's device.`
    : `you are currently playing against \n${
        username === p1.key ? p2.key : p1.key
      }`;

  return (
    <>
      <Players2 theme={theme}>
        <Main2 theme={theme}>{text}</Main2>
        {lastMatch ? (
          <>
            <ActivityIndicator size={"large"} color={theme.text} />
          </>
        ) : (
          <>
            <PlayerInfo2 theme={theme}>
              <Avatar />
              <Name theme={theme}>{p1.key}</Name>
            </PlayerInfo2>
            <Sub theme={theme}>{"vs."}</Sub>
            <PlayerInfo2>
              <Avatar />
              <Name>{p2.key}</Name>
            </PlayerInfo2>
          </>
        )}
      </Players2>
    </>
  );
});
export default STATS2;
