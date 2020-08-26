import React, { useContext, useCallback, useState } from "react";
import {
  HomeContainer,
  HeaderText,
  Header,
  Buttons,
  TopBar,
} from "./StyledHome";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import { ThemeContext } from "../../contexts/ThemeContext";
import NavButton from "../../components/buttons/NavButton";
import { Authcontext } from "../../contexts/AuthContext";
import HOME_INFO from "./Info";
import FRIEND_REQUEST from "./FriendRequest";
import LIST_UNFINISHED_MATCHES from "../../components/lists/ListUnfinishedMatches";
import { checkOpponentsStatus } from "../../_backend/db/crudCheck";
import updateAuthMatchesSave from "../../contexts/actions/authContext/UpdateMatchesSave";

const HOME = React.memo(({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const {
    userData: { username, matches, unfinishedMatches, friendRequestReceived },
  } = useContext(Authcontext);

  const [gameToContinue, setGameToContinue] = useState(null);

  const handleGameToContinue = useCallback((item) => {
    setGameToContinue(item);
  }, []);

  const handleNewGame = () => {
    navigation.navigate("pregame", {
      flag: "pregame",
    });
  };

  const handleContinueGame = async () => {
    const gameData = { ...gameToContinue, initializedBy: username };
    const opponentStatus = await checkOpponentsStatus(gameData.opponent);
    if (!opponentStatus) {
      await updateAuthMatchesSave(gameData, username, true);
      navigation.navigate("drawernavigator", {
        screen: "game",
        flag: "continue",
        gameData,
      });
    } else {
      alert("Your opponent is in another match at the moment");
    }
  };

  return (
    <>
      <TopBar
        friendRequestReceived={friendRequestReceived.length > 0}
        theme={theme}
      >
        {friendRequestReceived.length > 0 ? (
          <FRIEND_REQUEST />
        ) : (
          <>
            <NavButton
              length={"7"}
              active={false}
              direction={"column"}
              height={"auto"}
              icon={"menu"}
              color={"light"}
              action={() => navigation.toggleDrawer()}
            />
          </>
        )}
      </TopBar>
      <HomeContainer>
        <Header>
          <HeaderText theme={theme}>welcome</HeaderText>
          <HeaderText theme={theme}>{username}</HeaderText>
        </Header>
        {unfinishedMatches.length > 0 ? (
          <LIST_UNFINISHED_MATCHES
            gameToContinue={gameToContinue}
            handleGameToContinue={handleGameToContinue}
          />
        ) : (
          <HOME_INFO
            unfinishedMatches={unfinishedMatches}
            matches={matches}
            username={username}
          />
        )}
        <Buttons>
          {unfinishedMatches.length > 0 ? (
            <THEMED_BUTTON
              type={"success"}
              theme={theme}
              text={"continue game"}
              disabled={gameToContinue === null}
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
    </>
  );
});

export default HOME;
