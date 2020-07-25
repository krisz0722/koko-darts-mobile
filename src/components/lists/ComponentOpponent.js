import React, { useContext } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { BasicText, FlexRowAround, Window } from "../../styles/css_mixins";
import { ThemeContext } from "../../contexts/ThemeContext";
import { InGameSettingsContext } from "../../contexts/InGameSettingsContext";

export const Opponent = styled(TouchableOpacity)`
  ${FlexRowAround};

  padding: 2.5%;
  background-color: ${({ theme, active }) =>
    active ? theme.bgActive : "transparent"};
`;

export const OpponentAvatar = styled(Image)`
  width: ${() => Window.height * 0.06};
  height: ${() => Window.height * 0.06};
  border-radius: ${() => Window.height * 0.075};
  border-width: ${({ theme }) => theme.borderWidth}
  border-color: ${({ theme }) => theme.text}
  margin-right:10%;
`;

export const Name = styled(Text)`
  ${BasicText};  
  text-align:left;
  color: ${({ theme, active }) => (active ? theme.text2 : theme.text)}
  width: 50%;
  font-size: 15;
`;

const OPPONENT_COMPONENT = ({ item }) => {
  const { theme } = useContext(ThemeContext);

  const {
    dispatchInGameSettings,
    inGameSettings: { p2 },
  } = useContext(InGameSettingsContext);

  const choosePlayer = (value) => {
    dispatchInGameSettings({ type: "CHOOSE_OPPONENT", value });
  };

  const active = p2 === item.key;

  return (
    <Opponent
      active={active}
      onPress={() => choosePlayer(item.key)}
      theme={theme}
    >
      <OpponentAvatar theme={theme} resizeMode={"cover"} source={item.img} />
      <Name active={active}>{item.key}</Name>
    </Opponent>
  );
};

export default OPPONENT_COMPONENT;