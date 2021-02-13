import React, { useContext, useState } from "react";
import { Modal } from "react-native";
import THEMED_BUTTON from "../buttons/ThemedButton";
import RADIO_BUTTON_SET from "../buttons/RadioButtonSet";
import { ModalContainerBasic, Header } from "./StyledModal";
import { ThemeContext } from "../../contexts/ThemeContext";

const MODAL_SELECT = React.memo(
  ({
    animation,
    visible,
    modalType,
    toWin,
    toggleToWin,
    legsPerSet,
    toggleLegsPerSet,
    modalHandler,
  }) => {
    const { theme } = useContext(ThemeContext);

    const [toWinState, setToWin] = useState(toWin);
    const [legsPerSetState, setLegsPerSet] = useState(legsPerSet);

    const animationType = animation
      ? theme.name === "default"
        ? "fade"
        : "slide"
      : "none";

    const { type, legOrSet } = modalType;

    const OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const handleFirstToWin = (val) => {
      if (type === "main") {
        setToWin(val);
      } else {
        setLegsPerSet(val);
      }
    };

    const submitValues = () => {
      toggleToWin(toWinState);
      toggleLegsPerSet(legsPerSetState);
      modalHandler();
    };
    return (
      <Modal
        animationType={animationType}
        transparent={true}
        presentationStyle={"pageSheet"}
        visible={visible}
      >
        <ModalContainerBasic theme={theme}>
          <Header>
            {type === "main"
              ? legOrSet === "set"
                ? "sets to win"
                : "legs to win"
              : "legs per set to win"}
          </Header>
          <RADIO_BUTTON_SET
            length={9}
            direction={"column"}
            options={OPTIONS}
            action={handleFirstToWin}
            activeValue={type === "main" ? toWinState : legsPerSetState}
          />
          <THEMED_BUTTON action={submitValues} text={"ok"} type={"active2"} />
        </ModalContainerBasic>
      </Modal>
    );
  },
);

export default MODAL_SELECT;
