import React, { useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { BasicText, FlexRowBetween, Window } from "../../../styles/css_mixins";
import Icon from "react-native-vector-icons/MaterialIcons";

export const Friend = styled(View)`
  ${FlexRowBetween};
  padding: 0 5%;
  width: 100%;
  margin-top: 10;
  background-color: ${({ theme }) => "rgba(0,0,0,0.2)"};
`;

export const FriendAvatar = styled(Image)`
  width: ${() => Window.height * 0.06};
  height: ${() => Window.height * 0.06};
  border-radius: ${() => Window.height * 0.075};
  border-width: ${({ theme }) => theme.borderWidth}
  border-color: ${({ theme }) => theme.text}
  margin-right:5%;
`;

export const Name = styled(Text)`
  ${BasicText};
  padding:5%;
  text-align:left;
  color: ${({ theme }) => theme.text}
  width: 50%;
  font-size: 15;
  
`;

const FRIEND_COMPONENT = ({ item }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  return (
    <Friend theme={selectedTheme}>
      <FriendAvatar
        theme={selectedTheme}
        resizeMode={"cover"}
        source={item.img}
      />
      <Name>{item.name}</Name>
      <TouchableOpacity onPress={() => alert("remove friend")}>
        <Icon
          name={"remove-circle"}
          color={selectedTheme.bgRed}
          size={Window.height * 0.06}
        />
      </TouchableOpacity>
    </Friend>
  );
};

export default FRIEND_COMPONENT;
