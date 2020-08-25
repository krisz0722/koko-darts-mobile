import React, { useContext } from "react";
import THEMED_BUTTON from "../buttons/ThemedButton";
import { BottomButtons } from "./StyledModal";
import { Header2, ModalContainerAlert } from "./StyledModal";
import { GameContext } from "../../contexts/GameContext";
import { CommonActions } from "@react-navigation/native";
import updateAuthProfile from "../../contexts/actions/authContext/UpdateProfile";
import { ThemeContext } from "../../contexts/ThemeContext";

const FINISH_MATCH_MODAL = React.memo(({ navigation }) => {
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
    await updateAuthProfile(p1.key, p2.key, gameData, false);

    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "homdrawerenavigator" }],
      }),
    );
  };

  const initiateRematch = async () => {
    await dispatchGameData({ type: "FINISH_MATCH", isRematch: true });
    await updateAuthProfile(p1.key, p2.key, gameData, true);
  };

  return (
    <>
      <ModalContainerAlert theme={theme}>
        <Header2>{winnerName} has won the match!</Header2>
        <BottomButtons theme={theme}>
          <THEMED_BUTTON
            text={"back to home"}
            length={2}
            size={"small"}
            icon={"home"}
            type={"danger"}
            action={quitMatch}
            inGameTheme={theme}
          />
          <THEMED_BUTTON
            size={"small"}
            text={"rematch"}
            type={"success"}
            length={2}
            icon={"dart"}
            action={initiateRematch}
            inGameTheme={theme}
          />
        </BottomButtons>
      </ModalContainerAlert>
    </>
  );
});

export default FINISH_MATCH_MODAL;
