import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import { Modal } from "react-native";
import THEMED_BUTTON from "../buttons/ThemedButton";
import RADIO_BUTTON_SET from "../buttons/RadioButtonSet";
import { ModalContainerBasic, Header } from "./StyledModal";
import { ThemeContext } from "../../contexts/ThemeContext";

const MODAL_SELECT = ({ visible, modalType, modalHandler }) => {
  const { theme, animation } = useContext(ThemeContext);
  const {
    settings: { toWin, legsPerSet },
    dispatchSettings,
  } = useContext(SettingsContext);

  const animationType = animation
    ? theme.name === "default"
      ? "fade"
      : "slide"
    : "none";

  const { type, legOrSet } = modalType;

  const OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleFirstToWin = (val) => {
    if (type === "main") {
      dispatchSettings({ type: "CHANGE_TOWIN", value: val });
    } else {
      dispatchSettings({ type: "CHANGE_LEGSPERSET", value: val });
    }
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
          direction={"vertical"}
          options={OPTIONS}
          action={handleFirstToWin}
          activeValue={type === "main" ? toWin : legsPerSet}
        />
        <THEMED_BUTTON
          action={() => modalHandler()}
          text={"ok"}
          type={"active2"}
        />
      </ModalContainerBasic>
    </Modal>
  );
};

export default MODAL_SELECT;
