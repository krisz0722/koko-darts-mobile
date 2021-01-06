import React, { useContext } from "react";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import STATS_FINISH_MATCH from "../stats/StatsFinishMatch";
import { GameContext } from "../../contexts/GameContext";
import { Authcontext } from "../../contexts/AuthContext";
import { AppBackground } from "../../../App";
import { ScreenContainer } from "../../navigators/StyledNav";
import { Header, BottomButtons2 } from "./StyledEndGame";
import updateAuthProfile from "../../contexts/actions/authContext/UpdateProfile";
import navigatingIn from "../../utils/navigatingIn";
import navigatingOut from "../../utils/navigatingOut";

const FINISH_MATCH = React.memo(({ navigation }) => {
  const {
    dispatchGameData,
    gameData,
    gameData: {
      settings: { p1, p2, theme },
      winner,
    },
  } = useContext(GameContext);

  const {
    dispatchUserData,
    userData: { id },
  } = useContext(Authcontext);

  const winnerName = winner ? gameData.settings[winner].key : "";

  const updateProfiles = async (inGame) => {
    const p1Updated = await updateAuthProfile(
      p1,
      "p1",
      p1,
      p2,
      gameData,
      inGame,
    );
    const p2Updated = await updateAuthProfile(
      p2,
      "p2",
      p2,
      p1,
      gameData,
      inGame,
    );
    const updatedUserData = id === p1.id ? p1Updated : p2Updated;
    return updatedUserData;
  };

  const quitMatch = async () => {
    await dispatchGameData({ type: "FINISH_MATCH" });
    navigatingIn(navigation, "updateProfile");
    const updatedUserData = await updateProfiles(false);
    dispatchUserData({ type: "UPDATE_PROFILE", value: updatedUserData });
    navigatingOut(navigation, "updateProfile");
  };

  const initiateRematch = async () => {
    await dispatchGameData({ type: "FINISH_MATCH", isRematch: true });
    navigatingIn(navigation, null);
    const updatedUserData = await updateProfiles(true);
    dispatchUserData({ type: "UPDATE_PROFILE", value: updatedUserData });
    navigatingOut(navigation, null);
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
