import React, { useState, useContext } from "react";
import { Modal } from "react-native";
import THEMED_BUTTON from "../buttons/ThemedButton";
import { BottomButtons } from "./StyledModal";
import { Header2, ModalContainerAlert } from "./StyledModal";
import { GameContext } from "../../contexts/GameContext";
import { CommonActions, useNavigation } from "@react-navigation/native";

const FINISH_MATCH_MODAL = ({
  theme,
  animation,
  action,
  action2,
  action3,
  visible,
}) => {
  const navigation = useNavigation();

  // const [statsModal, setStatsModal] = useState(false);

  const {
    dispatchGameData,
    gameData,
    gameData: { winner },
  } = useContext(GameContext);

  const winnerName = winner ? gameData[winner].key : "";

  const animationType = animation
    ? theme.name === "default"
      ? "fade"
      : "slide"
    : "none";

  const quitMatch = () => {
    dispatchGameData({ type: "FINISH_MATCH" });
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "homenavigator" }],
      }),
    );
  };

  // const showStats = () => {
  //   action();
  //   navigation.navigate("stats");
  // };

  const initiateRematch = () => {
    console.log("saving match here....");
    action();
    action2();
    dispatchGameData({ type: "FINISH_MATCH" });
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
              text={"quit match"}
              length={2}
              size={"small"}
              icon={"arrow-back"}
              type={"danger"}
              action={quitMatch}
              inGameTheme={theme}
            />
            {/*<THEMED_BUTTON*/}
            {/*  text={"show stats"}*/}
            {/*  length={3}*/}
            {/*  size={"small"}*/}
            {/*  icon={"show-chart"}*/}
            {/*  type={"active"}*/}
            {/*  action={showStats}*/}
            {/*inGameTheme={theme}*/}
            {/*/>*/}
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
      {/*<STATS_MODAL*/}
      {/*  gameData={gameData}*/}
      {/*  action={() => setStatsModal(false)}*/}
      {/*  visible={statsModal}*/}
      {/*/>*/}
    </>
  );
};

export default FINISH_MATCH_MODAL;
