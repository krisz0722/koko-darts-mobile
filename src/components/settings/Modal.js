import React, { useContext, useState } from "react";
import styled from "styled-components";
import { GameContext } from "../../contexts/GameContext";
import { SettingsContext } from "../../contexts/SettingsContext";
import {
  SectionList,
  Alert,
  View,
  Modal,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import {
  BasicText,
  BasicTextBold,
  FlexCol,
  FlexColAround,
  FlexRowBetween,
  Window,
} from "../../styles/css_mixins";
import THEMED_BUTTON from "../buttons/ThemedButton";

const ModalContainer = styled(View)`
  height: 100%;
  width: 100%;
  padding: 10% 0;
  ${FlexColAround};
  background-color: rgba(255, 255, 255, 0.95);
`;

const Options = styled(View)`
  width: 50%;
  height: 70%;
  ${FlexColAround}
`;

const Header = styled(Text)`
${BasicTextBold}
height:10%;
width:100%;
margin:auto;
background-color: ${({ theme }) => theme.bg1};
color: ${({ theme }) => theme.text}
font-size:20;
`;

const Option = styled(View)`
  height: 6%;
  width: 30%;
  ${FlexRowBetween};
`;

const Label = styled(Text)`
  ${BasicTextBold}
  height: 100%;
  width: 50%;
`;

const Radio = styled(TouchableOpacity)`
  border-radius: ${() => (Window.height * 0.075) / 3};
  background-color: ${({ active, theme }) =>
    active ? theme.bg3 : "transparent"};
  border-color: ${({ theme }) => theme.bg1};
  border-width: ${({ theme }) => theme.borderWidth};
  height: ${() => (Window.height * 0.075) / 3};
  width: ${() => (Window.height * 0.075) / 3};
`;

const MODAL_SELECT = ({ visible, modalType, modalHandler }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);
  const {
    gameData: { toWin, legsPerSet },
    dispatchGameData,
  } = useContext(GameContext);

  const { type, legOrSet } = modalType;

  const OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleFirstToWin = (type, val) => {
    if (type === "main") {
      dispatchGameData({ type: "CHANGE_TOWIN", value: val });
    } else {
      dispatchGameData({ type: "CHANGE_LEGSPERSET", value: val });
    }
  };

  return (
    <Modal
      animationType={selectedTheme.name === "default" ? "fade" : "slide"}
      transparent={true}
      presentationStyle={"pageSheet"}
      visible={visible}
    >
      <ModalContainer theme={selectedTheme}>
        <Header>
          {type === "main"
            ? legOrSet === "set"
              ? "sets to win"
              : "legs to win"
            : "legs per set to win"}
        </Header>
        <Options>
          {OPTIONS.map((item) => (
            <Option>
              <Label>{item}</Label>
              <Radio
                onPress={() => handleFirstToWin(type, item)}
                active={type === "main" ? item === toWin : item === legsPerSet}
              ></Radio>
            </Option>
          ))}
        </Options>
        <THEMED_BUTTON
          action={() => modalHandler()}
          text={"ok"}
          type={"active2"}
        />
      </ModalContainer>
    </Modal>
  );
};

export default MODAL_SELECT;
