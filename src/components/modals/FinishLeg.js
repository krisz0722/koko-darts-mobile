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

const FINISH_LEG_MODAL = ({ action, visible }) => {
  const { theme, animation } = useContext(ThemeContext);

  const {
    dispatchGameData,
    gameData,
    gameData: { activePlayer, inactivePlayer, isLegOver, isMatchOver, winner },
  } = useContext(GameContext);

  const { inGameSettings } = useContext(InGameSettingsContext);

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

  const OPTIONS = nod() === 3 ? [3] : nod() === 2 ? [2, 3] : [1, 2, 3];

  const [lastRoundNod, setLastRoundNod] = useState(nod() === 3 ? 3 : null);

  const handleLastDartNod = (val) => setLastRoundNod(val);

  const finishLeg = () => {
    if (lastRoundNod) {
      setLastRoundNod(null),
        dispatchGameData({
          type: "FINISH_LEG",
          nodUsed: lastRoundNod,
          nodRequired: parseInt(nod()),
          settings: inGameSettings,
        });
    }
  };

  const back = () => {
    setLastRoundNod(null), dispatchGameData({ type: "UNDO" });
  };

  return (
    <Modal
      animationType={animationType}
      transparent={true}
      presentationStyle={"pageSheet"}
      visible={visible}
    >
      <ModalContainerAlert theme={theme}>
        <Header2>{winnerName} has won the leg!</Header2>
        <Header3>Number of darts used in last round:</Header3>
        <RADIO_BUTTON_SET
          length={3}
          direction={"row"}
          options={OPTIONS}
          action={handleLastDartNod}
          activeValue={lastRoundNod}
        />
        <BottomButtons theme={theme}>
          <THEMED_BUTTON
            text={"back"}
            length={2}
            size={"small"}
            icon={"arrow-back"}
            type={"danger"}
            action={back}
          />
          <THEMED_BUTTON
            size={"small"}
            text={lastRoundNod ? "ok" : "select"}
            type={lastRoundNod ? "success" : "danger"}
            length={2}
            icon={lastRoundNod ? "check" : "dart"}
            action={finishLeg}
          />
        </BottomButtons>
      </ModalContainerAlert>
    </Modal>
  );
};

export default FINISH_LEG_MODAL;
