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
import ACTIVITY_INDICATOR from "../../components/modals/Activityindicator";

const HOME = React.memo(({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const {
    userData: { username, matches, unfinishedMatches, friendRequestReceived },
  } = useContext(Authcontext);

  const [lastMatch, setLastMatch] = useState(null);
  const [unfinishedMatch, setUnfinishedMatch] = useState(null);
  const [overflow, setOverflow] = useState(false);
  const [newGameModal, setNewGameModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (unfinishedMatches.length > 0) {
      setUnfinishedMatch(unfinishedMatches[0]);
    }

    if (matches.length > 0) {
      setLastMatch(matches[0]);
    }
  }, [unfinishedMatches, matches]);

  const handleNewGame = () => {
    navigation.navigate("drawernavigator", {
      screen: "pregame",
      flag: "pregame",
    });
  };

  const handleNewGameModal = async () => {
    navigation.navigate("drawernavigator", {
      screen: "pregame",
      flag: "pregame",
    });
  };

  const handleContinueGame = () => {
    navigation.navigate("drawernavigator", {
      screen: "game",
      flag: "continue",
    });
  };

  return (
    <>
      {loading ? (
        <ACTIVITY_INDICATOR theme={theme} />
      ) : (
        <>
          {overflow ? (
            <OVERFLOW_MENU username={username} navigation={navigation} />
          ) : null}
          <TopBar
            friendRequestReceived={friendRequestReceived.length > 0}
            theme={theme}
          >
            {friendRequestReceived.length > 0 ? (
              <FRIEND_REQUEST />
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
            <HOME_INFO lastMatch={lastMatch} username={username} />
            <Buttons>
              {unfinishedMatches.length > 0 ? (
                <THEMED_BUTTON
                  type={"success"}
                  theme={theme}
                  text={"continue game"}
                  action={() => handleContinueGame()}
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
      )}
    </>
  );
});

export default HOME;
