import React, { useContext, useEffect, useState } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
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
import { Alert, BackHandler } from "react-native";
import { GameContext } from "../../contexts/GameContext";

const HOME = ({ route, navigation }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const { dispatchGameData } = useContext(GameContext);

  const [unfinished, setUnfinished] = useState(true);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("", "Are you sure you want to exit the application?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const infoUnfinished = {
    title: "You have an unfinished game!",
    rows: [
      {
        title: "last palyed on:",
        value: "2020.05.12",
      },
      {
        title: "opponent",
        value: "Mustang",
      },
      {
        title: "match standing",
        value: "3-2",
      },
      {
        title: "match average",
        value: "65.21",
      },
    ],
  };

  const infoLastMatch = {
    title: "Your last match:",
    rows: [
      {
        title: "result:",
        value: "3-2 (WIN)",
      },
      {
        title: "opponent",
        value: "Mustang",
      },
      {
        title: "match average",
        value: "65.2",
      },
      {
        title: "best leg average",
        value: "110.2",
      },
    ],
  };

  const renderContent = unfinished ? infoUnfinished : infoLastMatch;

  const handleNewGame = () => {
    if (unfinished) {
      Alert.alert(
        "You have an unfinished match",
        "If you start a new match, you are going to lose your previous unfinished match. Proceed?",
        [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          {
            text: "YES",
            onPress: () => {
              dispatchGameData({ type: "CREATE_NEW_MATCH" });
              navigation.navigate("pregame");
            },
          },
        ],
      );
    } else {
      dispatchGameData({ type: "CREATE_NEW_MATCH" });
      navigation.navigate("pregame");
      setUnfinished(false);
    }
  };

  return (
    <>
      <Header>
        <HeaderText theme={selectedTheme}>welcome</HeaderText>
        <HeaderText theme={selectedTheme}>valaki</HeaderText>
      </Header>
      <InfoTitle unfinished={unfinished}>{renderContent.title}</InfoTitle>
      <Info unfinished={unfinished}>
        <InfoStats theme={selectedTheme}>
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
            theme={selectedTheme}
            text={"continue game"}
          />
        ) : null}
        <THEMED_BUTTON
          valami={1}
          type={"active"}
          theme={selectedTheme}
          text={"new game"}
          action={() => handleNewGame()}
        />
      </Buttons>
    </>
  );
};

export default HOME;
