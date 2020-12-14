import React, { useContext, useCallback, useState } from "react";
import { HomeContainer, HeaderCon, Buttons, TopBar } from "./StyledHome";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import { ThemeContext } from "../../contexts/ThemeContext";
import NAV_BUTTON from "../../components/buttons/NavButton";
import { Authcontext } from "../../contexts/AuthContext";
import HOME_INFO from "./Info";
import FRIEND_REQUEST from "./FriendRequest";
import LIST_UNFINISHED_MATCHES from "../../components/lists/ListUnfinishedMatches";
import updateAuthMatchesSave from "../../contexts/actions/authContext/UpdateMatchesSave";
import { Header1 } from "../../components/headers/StyledHeaders";
import fetchPost from "../../utils/fetchPost";

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
    const opponentStatus = await fetchPost("api/checkopponent", {
      opponent: gameData.opponent,
    });

    if (!opponentStatus) {
      await updateAuthMatchesSave(gameData, username, true, "continue");
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
            <NAV_BUTTON
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
        <HeaderCon theme={theme}>
          <Header1 theme={theme}>welcome</Header1>
          <Header1 theme={theme}>{username}</Header1>
        </HeaderCon>
        {unfinishedMatches.length > 0 ? (
          <LIST_UNFINISHED_MATCHES
            theme={theme}
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
