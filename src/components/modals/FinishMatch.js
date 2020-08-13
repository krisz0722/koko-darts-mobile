import React, { useState, useContext } from "react";
import { Modal } from "react-native";
import THEMED_BUTTON from "../buttons/ThemedButton";
import { BottomButtons, ModalContainerBasic } from "./StyledModal";
import { Header2, Header3, Header4, ModalContainerAlert } from "./StyledModal";
import { ThemeContext } from "../../contexts/ThemeContext";
import RADIO_BUTTON_SET from "../buttons/RadioButtonSet";
import { CHECKOUTS } from "../../calc/scores";
import { GameContext } from "../../contexts/GameContext";
import { InGameSettingsContext } from "../../contexts/InGameSettingsContext";
import { SettingsContext } from "../../contexts/SettingsContext";
import { CommonActions, useNavigation } from "@react-navigation/native";

const FINISH_MATCH_MODAL = ({ action, action2, visible }) => {
  const navigation = useNavigation();

  const { theme, animation } = useContext(ThemeContext);

  const {
    dispatchGameData,
    gameData,
    gameData: { activePlayer, inactivePlayer, isLegOver, isMatchOver, winner },
  } = useContext(GameContext);

  const { dispatchInGameSettings, inGameSettings } = useContext(
    InGameSettingsContext,
  );

  const { settings } = useContext(SettingsContext);

  const winnerName = winner ? gameData[winner].key : "";
  const inapKey = `${inactivePlayer}_DATA`;
  const inapData = gameData[inapKey];

  const apKey = `${activePlayer}_DATA`;
  const apData = gameData[apKey];
  const apOnCheckout = apData.onCheckout;

  const animationType = animation
    ? theme.name === "default"
      ? "fade"
      : "slide"
    : "none";

  const nod = () => {
    if (isLegOver) {
      return CHECKOUTS.find((co) => co.value === inapData.lastScore)
        .checkouts[0].nod;
    }
    if (apOnCheckout) {
      return CHECKOUTS.find((co) => co.value === apData.score).checkouts[0].nod;
    }
    return null;
  };

  const [lastRoundNod, setLastRoundNod] = useState(nod() === 3 ? 3 : null);

  const finishLeg = () => {
    if (lastRoundNod) {
      setLastRoundNod(null),
        dispatchGameData({
          type: "FINISH_LEG",
          nodUsed: lastRoundNod,
          nodRequired: parseInt(nod()),
          settings: inGameSettings,
        });
      action();
    }
  };

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
    dispatchGameData({ type: "SAVE_MATCH" });
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
