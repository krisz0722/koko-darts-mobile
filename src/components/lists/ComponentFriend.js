import React, { useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { BasicText, FlexRowBetween, Window } from "../../styles/css_mixins";
import { ThemeContext } from "../../contexts/ThemeContext";
export const Friend = styled(View)`
  ${FlexRowBetween};
  padding: 0 5%;
  width: 100%;
  margin-top: 10;
  background-color: rgba(255, 255, 255, 0.1);
  height: ${() => Window.height * 0.06};
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
  text-align:left;
  color: ${({ theme }) => theme.text}
  width: 65%;
  margin-right:5%;
  
  font-size: ${({ theme }) => theme.friends.name} ;
`;

export const Record = styled(Text)`
  ${BasicText};
  color: ${({ theme, record }) =>
    record === theme.bgActive ? theme.text2 : theme.text}
  width: 15%;
  border-radius:4px;
  height:65%;
  font-size: ${({ theme }) => theme.friends.name} ;
  background-color: ${({ record }) => record}
`;

const FRIEND_COMPONENT = ({ item }) => {
  const { theme } = useContext(ThemeContext);

  const { winsAgainst, lossesAgainst } = item;

  const record = () => {
    if (winsAgainst === lossesAgainst) {
      return theme.bgActive;
    } else if (winsAgainst > lossesAgainst) {
      return theme.bgGreen;
    } else if (winsAgainst < lossesAgainst) {
      return theme.bgRed;
    } else {
      return null;
    }
  };

  return (
    <Friend theme={theme}>
      {item.img === "" ? (
        <FriendAvatar
          theme={theme}
          resizeMode={"cover"}
          source={require("../../../assets/bg.png")}
        />
      ) : (
        <FriendAvatar
          theme={theme}
          resizeMode={"cover"}
          source={{ uri: item.img }}
        />
      )}

      <Name theme={theme}>{item.key}</Name>
      <Record
        record={record()}
        theme={theme}
      >{`${item.winsAgainst} - ${item.lossesAgainst}`}</Record>
      {/*<RemoveButton theme={theme} onPress={() => alert("remove friend")}>*/}
      {/*  <Icon name={"remove"} color={theme.bgRed} size={Window.height * 0.06} />*/}
      {/*</RemoveButton>*/}
    </Friend>
  );
};

export default FRIEND_COMPONENT;
