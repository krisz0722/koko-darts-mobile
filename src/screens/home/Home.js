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
} from "./StyledHome";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import { BackHandler } from "react-native";
import EXIT_APP_ALERT from "../../components/modals/ExitAppAlert";
import UNFINISHED_MATCH from "./DataUnfinished";
import LAST_MATCH from "./DataLastMatch";
import NEW_GAME_ALERT from "../../components/modals/NewGameAlert";
import { ThemeContext } from "../../contexts/ThemeContext";

const HOME = React.memo(({ navigation }) => {
  const { theme } = useContext(ThemeContext);

  const [unfinished, setUnfinished] = useState(true);
  const [exitModal, setExitModal] = useState(false);
  const [newGameModal, setNewGameModal] = useState(false);

  useEffect(() => {
    const backAction = () => {
      setExitModal(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, []);

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

  const handleExitApp = () => {
    BackHandler.exitApp();
    setExitModal(!exitModal);
  };

  console.log("RENDER HOME SCREEN");

  return (
    <>
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
      <EXIT_APP_ALERT
        action1={() => setExitModal(!exitModal)}
        action2={handleExitApp}
        visible={exitModal}
      />
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
