import React, { useContext } from "react";
import { Modal } from "react-native";
import THEMED_BUTTON from "../buttons/ThemedButton";
import { BottomButtons } from "./StyledModal";
import { Header2, ModalContainerAlert } from "./StyledModal";
import { GameContext } from "../../contexts/GameContext";
import { CommonActions, useNavigation } from "@react-navigation/native";
import updateAuthProfile from "../../contexts/actions/authContext/UpdateProfile";

const FINISH_MATCH_MODAL = ({ theme, animation, action, action2, visible }) => {
  const navigation = useNavigation();

  const {
    dispatchGameData,
    gameData,
    gameData: {
      settings: { p1, p2 },
      winner,
    },
  } = useContext(GameContext);

  const winnerName = winner ? gameData.settings[winner].key : "";

  const animationType = animation
    ? theme.name === "default"
      ? "fade"
      : "slide"
    : "none";

  const quitMatch = async () => {
    await dispatchGameData({ type: "FINISH_MATCH" });
    await updateAuthProfile(p1.key, p2.key, gameData, false);

    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "homenavigator" }],
      }),
    );
  };

  const initiateRematch = async () => {
    await dispatchGameData({ type: "FINISH_MATCH", isRematch: true });
    await updateAuthProfile(p1.key, p2.key, gameData, true);
    action();
    action2();
  };

  return (
    <>
      <Modal
        animationType={animationType}
        transparent={true}
        presentationStyle={"pageSheet"}
        visible={visible}
      >
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
      </Modal>
    </>
  );
};

export default FINISH_MATCH_MODAL;
