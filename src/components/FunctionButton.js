import styled from "styled-components";
import { TouchableOpacity, Text, TouchableHighlight } from "react-native";
import { FlexRowAround } from "../styles/css_mixins";
import React, { useContext } from "react";
import { SettingsContext } from "../contexts/SettingsContext";
import Icon from "react-native-vector-icons/MaterialIcons";
import { GameContext } from "../contexts/GameContext";

export const Button_Function_Classic = styled(TouchableHighlight)`
  ${FlexRowAround}
  width: ${() => 100 / 3 + "%"};
  padding:2%;
  height: ${({ middle }) => (middle ? "50%" : "25%")};  
  background-color: ${({ theme }) => theme.game.middle.bgMid};
  border-color: ${({ theme, ap }) => theme.game[ap + "Border"]};
  border-width: ${({ theme }) => theme.borderWidth};
`;

export const Text_Function = styled(Text)`
  text-align-vertical: center;
  text-align: center;
  height: 100%;
  width: 75%;
  font-family: ${({ theme }) => theme.fontFamilyBold};
  font-size: 12.5;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text};
`;

const CLASSIC_FUNCTION = ({ value, action = null, icon, middle = false }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const theme = selectedTheme;
  const {
    dispatchGameData,
    gameData: { activePlayer },
  } = useContext(GameContext);

  const handleOnPress = (value, action) => {
    console.log(value, action);
    if (action) {
      dispatchGameData({ type: action, value });
    } else {
      dispatchGameData({ type: "SUBMIT", value });
    }
  };
  return (
    <Button_Function_Classic
      ap={activePlayer}
      onPress={() => handleOnPress(value, action)}
      middle={middle}
    >
      <>
        {icon ? (
          <Icon
            style={{ marginHorizontal: "2%" }}
            name={icon}
            size={25}
            color={theme.text}
          />
        ) : null}
        <Text_Function>{value}</Text_Function>
      </>
    </Button_Function_Classic>
  );
};

export default CLASSIC_FUNCTION;
