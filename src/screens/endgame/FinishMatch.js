import React, { useContext } from "react";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import { BottomButtons2 } from "../stats/StyledStats";
import { GameContext } from "../../contexts/GameContext";
import updateAuthProfile from "../../contexts/actions/authContext/UpdateProfile";
import { ThemeContext } from "../../contexts/ThemeContext";
import STATS2 from "../stats/Stats2";
import { AppBackground } from "../../../App";
import { ScreenContainer } from "../../navigators/AppNavigator";
import { Header } from "../stats/StyledStats";

const FINISH_MATCH = React.memo(({ navigation }) => {
  const { theme } = useContext(ThemeContext);

  const {
    dispatchGameData,
    gameData,
    gameData: {
      settings: { p1, p2 },
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
          <Header>{winnerName} has won the match!</Header>
          <STATS2 />
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
