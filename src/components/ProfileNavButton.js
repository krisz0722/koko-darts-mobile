import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { Animated, Text, TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SettingsContext } from "../contexts/SettingsContext";
import { GameContext } from "../contexts/GameContext";
import { FlexCol, FlexRowAround } from "../styles/css_mixins";
import createAnimation from "../styles/playerSwitchTransition";

export const Button_Function_Classic = styled(TouchableHighlight)`
  ${FlexRowAround}
  width: ${() => 100 / 3 + "%"};
  height:100%;
  padding: 0 5%;  
  background-color: ${({ theme, active }) =>
    active ? theme.bgActive : "transparent"};
`;

export const Text_Function = styled(Text)`
  text-align-vertical: center;
  text-align: center;
  height: 50%;
  width: 75%;
  font-family: ${({ theme }) => theme.fontFamilyBold};
  font-size: 12.5;
  color: ${({ theme, active }) => (active ? theme.text2 : theme.text)};
  text-transform: uppercase;
`;

const TOPNAV_BUTTON = ({ active, value, action = null, icon }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const theme = selectedTheme;

  return (
    <Button_Function_Classic active={active} onPress={() => action(value)}>
      <>
        <Icon
          style={{ marginHorizontal: "2%" }}
          name={icon}
          size={25}
          color={active ? theme.text2 : theme.text}
        />
        <Text_Function active={active} theme={selectedTheme}>
          {value}
        </Text_Function>
      </>
    </Button_Function_Classic>
  );
};

export default TOPNAV_BUTTON;

//TODO Icon.Button component!
