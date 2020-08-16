import React, { useContext } from "react";
import {
  TopButtons,
  Friend,
  Friendrequest,
  FriendName,
  FriendAvatar,
} from "./StyledHome";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import { ThemeContext } from "../../contexts/ThemeContext";

const FRIEND_REQUEST = React.memo(({ navigation, action }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Friendrequest theme={theme}>
      <Friend>
        <FriendAvatar
          theme={theme}
          resizeMode={"cover"}
          source={require("../../../assets/bg.png")}
        />
        <FriendName>michael schimacher jose armando</FriendName>
      </Friend>

      <TopButtons>
        <THEMED_BUTTON
          length={2}
          size={"small"}
          type={"danger"}
          icon={"clear"}
          action={() => action(false)}
        />
        <THEMED_BUTTON
          length={2}
          size={"small"}
          type={"success"}
          icon={"check"}
          action={() => action(false)}
        />
      </TopButtons>
    </Friendrequest>
  );
});

export default FRIEND_REQUEST;

//TODO friend request info bar at the top, app update info bar top
