import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Friend, FriendAvatar, Name, Record } from "./StyledComponentFriend";

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
    </Friend>
  );
};

export default FRIEND_COMPONENT;
