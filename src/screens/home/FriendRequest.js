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
import acceptAuthRequest from "../../contexts/actions/authContext/AcceptRequest";
import declineAuthRequest from "../../contexts/actions/authContext/DeclineRequest";

const FRIEND_REQUEST = React.memo(({}) => {
  const { theme } = useContext(ThemeContext);
  const {
    userData,
    userData: { friendRequestReceived },
  } = useContext(Authcontext);

  const accept = async () => {
    await acceptAuthRequest(userData, friendRequestReceived[0]);
  };

  const decline = async () => {
    await declineAuthRequest(userData, friendRequestReceived[0]);
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
