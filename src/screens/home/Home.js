import React, { useContext, useEffect, useState } from "react";
import {
  Info,
  HeaderText,
  InfoTitle,
  InfoRow,
  InfoText,
  InfoText2,
  InfoStats,
  Header,
  Buttons,
  TopButtons,
  TopBar,
  Friend,
  Friendrequest,
  FriendName,
  FriendMessage,
  FriendAvatar,
  LogOut,
  OverflowMenu,
} from "./StyledHome";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import UNFINISHED_MATCH from "./DataUnfinished";
import LAST_MATCH from "./DataLastMatch";
import NEW_GAME_ALERT from "../../components/modals/NewGameAlert";
import { ThemeContext } from "../../contexts/ThemeContext";
import NavButton from "../../components/buttons/NavButton";
import { logOut, deleteAccount } from "../../fb/auth";

const HOME = React.memo(({ navigation }) => {
  const { theme } = useContext(ThemeContext);

  const [unfinished, setUnfinished] = useState(false);
  const [friendRequest, setFriendRequest] = useState(true);
  const [overflow, setOverflow] = useState(false);
  const [newGameModal, setNewGameModal] = useState(false);

  const renderContent = unfinished ? UNFINISHED_MATCH : LAST_MATCH;

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
        <OverflowMenu>
          <NavButton
            text={"about the app"}
            length={"auto"}
            active={false}
            direction={"row"}
            height={"auto"}
            icon={"info"}
            color={"dark"}
            action={() => alert("info")}
          />
          <NavButton
            text={"log out"}
            length={"auto"}
            active={false}
            direction={"row"}
            height={"auto"}
            icon={"exit-to-app"}
            color={"dark"}
            action={() => logOut()}
          />
          <NavButton
            text={"delete account"}
            length={"auto"}
            active={false}
            direction={"row"}
            height={"auto"}
            icon={"delete"}
            color={"dark"}
            action={() => deleteAccount()}
          />
        </OverflowMenu>
      ) : null}

      <TopBar friendRequest={friendRequest} theme={theme}>
        {friendRequest ? (
          <>
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
                  action={() => setFriendRequest(false)}
                />
                <THEMED_BUTTON
                  length={2}
                  size={"small"}
                  type={"success"}
                  icon={"check"}
                  action={() => setFriendRequest(false)}
                />
              </TopButtons>
            </Friendrequest>
          </>
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
      <Header>
        <HeaderText theme={theme}>welcome</HeaderText>
        <HeaderText theme={theme}>valaki</HeaderText>
      </Header>
      <InfoTitle unfinished={unfinished}>{renderContent.title}</InfoTitle>
      <Info unfinished={unfinished}>
        <InfoStats theme={theme}>
          {renderContent.rows.map((item) => (
            <React.Fragment key={item.value}>
              <InfoRow>
                <InfoText>{item.title}</InfoText>
                <InfoText2>{item.value}</InfoText2>
              </InfoRow>
            </React.Fragment>
          ))}
        </InfoStats>
      </Info>
      <Buttons>
        {unfinished ? (
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
