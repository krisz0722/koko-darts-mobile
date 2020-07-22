import React, { useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import {
  BasicText,
  FlexCol,
  FlexRowBetween,
  Window,
} from "../../../styles/css_mixins";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ThemeContext } from "../../../contexts/ThemeContext";
export const Friend = styled(View)`
  ${FlexRowBetween};
  padding: 0 5%;
  width: 100%;
  margin-top: 10;
  background-color: rgba(255, 255, 255, 0.1);
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

export const RemoveButton = styled(TouchableOpacity)``;

const FRIEND_COMPONENT = ({ item }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Friend theme={theme}>
      <FriendAvatar theme={theme} resizeMode={"cover"} source={item.img} />
      <Name>{item.name}</Name>
      <RemoveButton theme={theme} onPress={() => alert("remove friend")}>
        <Icon name={"remove"} color={theme.bgRed} size={Window.height * 0.06} />
      </RemoveButton>
    </Friend>
  );
};

export default FRIEND_COMPONENT;
