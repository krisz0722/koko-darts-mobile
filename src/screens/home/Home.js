import React, { useContext, useEffect, useState } from "react";
import {
  HomeContainer,
  HeaderText,
  Header,
  Buttons,
  TopBar,
} from "./StyledHome";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import NEW_GAME_ALERT from "../../components/modals/NewGameAlert";
import { ThemeContext } from "../../contexts/ThemeContext";
import NavButton from "../../components/buttons/NavButton";
import { Authcontext } from "../../contexts/AuthContext";
import HOME_INFO from "./Info";
import OVERFLOW_MENU from "./OverflowMenu";
import FRIEND_REQUEST from "./FriendRequest";

const HOME = React.memo(({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const {
    userData,
    userData: { username, matches, requestReceived },
  } = useContext(Authcontext);

  const lastMatch = matches[0];
  const status = lastMatch ? lastMatch.status === "unfinished" : "empty";
  console.log("HOME LASTMATCH", lastMatch);
  const request = requestReceived.length > 0;

  const [unfinished, setUnfinished] = useState(status);
  const [friendRequest, setFriendRequest] = useState(request);
  const [overflow, setOverflow] = useState(false);
  const [newGameModal, setNewGameModal] = useState(false);

  useEffect(() => {
    return () => setOverflow(false);
  }, []);

  const handleNewGame = () => {
    if (unfinished) {
      setNewGameModal(!newGameModal);
    } else {
      navigation.navigate("drawernavigator");
      setUnfinished(false);
    }
  };

  const handleNewGameModal = () => {
    navigation.navigate("drawernavigator");
    setUnfinished(false);
    setTimeout(() => {
      setNewGameModal(!newGameModal);
    }, 300);
  };

  return (
    <>
      {overflow ? (
        <OVERFLOW_MENU username={username} navigation={navigation} />
      ) : null}
      <TopBar friendRequest={friendRequest} theme={theme}>
        {friendRequest ? (
          <FRIEND_REQUEST action={setFriendRequest(false)} />
        ) : (
          <>
            <NavButton
              length={"8"}
              active={false}
              direction={"column"}
              height={"auto"}
              icon={"more-vert"}
              color={"light"}
              action={() => setOverflow(!overflow)}
            />
          </>
        )}
      </TopBar>
      <HomeContainer>
        <Header>
          <HeaderText theme={theme}>welcome</HeaderText>
          <HeaderText theme={theme}>{username}</HeaderText>
        </Header>
        <HOME_INFO lastMatch={lastMatch} unfinished={unfinished} />
        <Buttons>
          {unfinished == true ? (
            <THEMED_BUTTON
              type={"success"}
              theme={theme}
              text={"continue game"}
            />
          ) : null}
          <THEMED_BUTTON
            valami={1}
            type={"active"}
            theme={theme}
            text={"new game"}
            action={() => handleNewGame()}
          />
        </Buttons>
      </HomeContainer>
      <NEW_GAME_ALERT
        action1={() => setNewGameModal(!newGameModal)}
        action2={handleNewGameModal}
        visible={newGameModal}
      />
    </>
  );
});

export default HOME;

//TODO friend request info bar at the top, app update info bar top
