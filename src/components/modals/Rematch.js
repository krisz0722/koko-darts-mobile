import React, { useState, useContext } from "react";
import { Modal } from "react-native";
import THEMED_BUTTON from "../buttons/ThemedButton";
import { BottomButtons } from "./StyledModal";
import { Header2, Header3, ModalContainerAlert } from "./StyledModal";
import { ThemeContext } from "../../contexts/ThemeContext";
import RADIO_BUTTON_SET from "../buttons/RadioButtonSet";
import { GameContext } from "../../contexts/GameContext";
import { InGameSettingsContext } from "../../contexts/InGameSettingsContext";
import { SettingsContext } from "../../contexts/SettingsContext";
import { CommonActions, useNavigation } from "@react-navigation/native";

const REMATCH_MODAL = ({ action, visible }) => {
  const navigation = useNavigation();

  const { theme, animation } = useContext(ThemeContext);

  const {
    inGameSettings,
    inGameSettings: { startingScore },
    dispatchInGameSettings,
  } = useContext(InGameSettingsContext);

  const { settings } = useContext(SettingsContext);

  const {
    dispatchGameData,
    gameData: { p1, p2 },
  } = useContext(GameContext);

  const animationType = animation
    ? theme.name === "default"
      ? "fade"
      : "slide"
    : "none";

  const [activePlayer, setActivePlayer] = useState(null);
  const [inactivePlayer, setInactivePlayer] = useState(null);

  const handlePLayerToStart = (val) => {
    const active = val === p1.key ? p1 : p2;
    const inactive = active === p1 ? p2 : p1;
    setActivePlayer(active);
    setInactivePlayer(inactive);
  };

  const activePlayerName = activePlayer ? activePlayer.key : "";

  const OPTIONS = [p1.key, p2.key];

  const quitGame = () => {
    dispatchInGameSettings({ type: "LOAD_SETTINGS", value: settings });
    dispatchGameData({ type: "LOAD_SETTINGS", value: settings });
    action();
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "homenavigator" }],
      }),
    );
  };

  const rematch = () => {
    if (activePlayer) {
      dispatchGameData({
        type: "REMATCH",
        activePlayer,
        inactivePlayer,
        startingScore,
      });
      dispatchInGameSettings({
        type: "REMATCH",
        p1: activePlayer,
        p2: inactivePlayer,
        value: inGameSettings,
      });
      action();
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "game" }],
        }),
      );
    }
    return null;
  };

  return (
    <Modal
      animationType={animationType}
      transparent={true}
      presentationStyle={"pageSheet"}
      visible={visible}
    >
      <ModalContainerAlert theme={theme}>
        <Header2>throw for the start!</Header2>
        <Header3>selec the player to start the next match</Header3>
        <RADIO_BUTTON_SET
          length={2}
          direction={"horizontal"}
          options={OPTIONS}
          action={handlePLayerToStart}
          activeValue={activePlayerName}
        />
        <BottomButtons theme={theme}>
          <THEMED_BUTTON
            text={"quit game"}
            length={2}
            size={"small"}
            icon={"arrow-back"}
            type={"danger"}
            action={quitGame}
          />
          <THEMED_BUTTON
            size={"small"}
            text={activePlayer ? "game on!" : "select"}
            type={"success"}
            length={2}
            icon={activePlayer ? "check" : "person"}
            action={rematch}
          />
        </BottomButtons>
      </ModalContainerAlert>
    </Modal>
  );
};

export default REMATCH_MODAL;
