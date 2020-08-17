import React, { useState, useContext } from "react";
import { Modal } from "react-native";
import THEMED_BUTTON from "../buttons/ThemedButton";
import { BottomButtons } from "./StyledModal";
import { Header2, ModalContainerAlert } from "./StyledModal";
import { ThemeContext } from "../../contexts/ThemeContext";
import { GameContext } from "../../contexts/GameContext";
import { InGameSettingsContext } from "../../contexts/InGameSettingsContext";
import { SettingsContext } from "../../contexts/SettingsContext";
import { CommonActions, useNavigation } from "@react-navigation/native";

const FINISH_MATCH_MODAL = ({ action, action2, visible }) => {
  const navigation = useNavigation();

  const { theme, animation } = useContext(ThemeContext);
  const { dispatchInGameSettings } = useContext(InGameSettingsContext);
  const { settings } = useContext(SettingsContext);
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
    dispatchInGameSettings({ type: "LOAD_SETTINGS", value: settings });
    dispatchGameData({ type: "LOAD_SETTINGS", value: settings });
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "homenavigator" }],
      }),
    );
  };

  const showStats = () => {
    navigation.navigate("stats", { gameData, back: "game" });
  };

  const initiateRematch = () => {
    dispatchGameData({ type: "FINISH_MATCH" });
    console.log("saving match here....");
    action();
    action2();
  };

  return (
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
            length={3}
            size={"small"}
            icon={"arrow-back"}
            type={"danger"}
            action={quitMatch}
          />
          <THEMED_BUTTON
            text={"show stats"}
            length={3}
            size={"small"}
            icon={"show-chart"}
            type={"active"}
            action={showStats}
          />
          <THEMED_BUTTON
            size={"small"}
            text={"rematch"}
            type={"success"}
            length={3}
            icon={"dart"}
            action={initiateRematch}
          />
        </BottomButtons>
      </ModalContainerAlert>
    </Modal>
  );
};

export default FINISH_MATCH_MODAL;
