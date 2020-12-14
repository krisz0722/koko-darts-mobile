import React, { useContext } from "react";
import {
  TopButtons,
  Friend,
  Friendrequest,
  FriendName,
  FriendAvatar,
} from "./StyledFriendRequest";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Authcontext } from "../../contexts/AuthContext";
import fetchPost from "../../utils/fetchPost";

const FRIEND_REQUEST = React.memo(({}) => {
  const { theme } = useContext(ThemeContext);
  const {
    userData,
    dispatchUserData,
    userData: { friendRequestReceived },
  } = useContext(Authcontext);

  const sender = friendRequestReceived[0];

  const accept = async () => {
    const index = friendRequestReceived.indexOf(sender);
    friendRequestReceived.splice(index, 1);
    const updatedUserData = await fetchPost("api/acceptrequest", {
      acceptor: userData,
      friendRequestReceived,
      sender,
    });
    dispatchUserData({ type: "UPDATE_PROFILE", value: updatedUserData });
  };

  const decline = async () => {
    const index = friendRequestReceived.indexOf(sender);
    friendRequestReceived.splice(index, 1);

    const updatedUserData = await fetchPost("api/declinerequest", {
      acceptor: userData,
      friendRequestReceived,
      sender,
    });
    dispatchUserData({ type: "UPDATE_PROFILE", value: updatedUserData });
  };

  return (
    <Friendrequest theme={theme}>
      <Friend>
        <FriendAvatar
          theme={theme}
          resizeMode={"cover"}
          source={friendRequestReceived[0].img}
        />
        <FriendName>{friendRequestReceived[0].username}</FriendName>
      </Friend>

      <TopButtons>
        <THEMED_BUTTON
          length={2}
          size={"small"}
          type={"danger"}
          icon={"clear"}
          action={() => decline()}
        />
        <THEMED_BUTTON
          length={2}
          size={"small"}
          type={"success"}
          icon={"check"}
          action={() => accept()}
        />
      </TopButtons>
    </Friendrequest>
  );
});

export default FRIEND_REQUEST;
