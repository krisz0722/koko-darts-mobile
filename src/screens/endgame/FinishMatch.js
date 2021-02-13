import React, { useContext } from "react";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import { GameContext } from "../../contexts/GameContext";
import updateAuthProfile from "../../contexts/actions/authContext/UpdateProfile";
import STATS_FINISH_MATCH from "../stats/StatsFinishMatch";
import { AppBackground } from "../../../App";
import { ScreenContainer } from "../../navigators/StyledNav";
import { Header, BottomButtons2 } from "./StyledEndGame";

const FINISH_MATCH = React.memo(({ navigation }) => {
  const {
    dispatchGameData,
    gameData,
    gameData: {
      settings: { p1, p2, theme },
      winner,
    },
  } = useContext(GameContext);

  const winnerName = winner ? gameData.settings[winner].key : "";

  const quitMatch = async () => {
    await dispatchGameData({ type: "FINISH_MATCH" });
    await updateAuthProfile(
      p1.key,
      p2.key,
      gameData,
      false,
      navigation,
      "updateProfile",
    );
  };

  const initiateRematch = async () => {
    await dispatchGameData({ type: "FINISH_MATCH", isRematch: true });
    await updateAuthProfile(p1.key, p2.key, gameData, true, navigation, null);
  };

  return (
    <>
      <>
        <AppBackground
          source={require("../../../assets/bg.png")}
          resizeMode="cover"
        />
        <ScreenContainer theme={theme}>
          <Header theme={theme}>{winnerName} has won the match!</Header>
          <STATS_FINISH_MATCH />
          <BottomButtons2 theme={theme}>
            <THEMED_BUTTON
              text={"back to home"}
              length={2}
              size={"small"}
              type={"danger"}
              action={quitMatch}
              inGameTheme={theme}
            />
            <THEMED_BUTTON
              size={"small"}
              text={"rematch"}
              type={"success"}
              length={2}
              action={initiateRematch}
              inGameTheme={theme}
            />
          </BottomButtons2>
        </ScreenContainer>
      </>
    </>
  );
});

export default FINISH_MATCH;
