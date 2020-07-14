import React, { useContext, useState } from "react";
import { Text } from "react-native";
import { SettingsContext } from "../contexts/SettingsContext";
import {
  Info,
  Buttons,
  HeaderWelcome,
  InfoTitle,
  InfoRow,
  InfoText,
  InfoText2,
  InfoStats,
} from "../components/containers/Home";
import HomeButton from "../components/HomeButton";
import GhostButton from "../components/GhostButton";

const HOME = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const [unfinished, setUnfinished] = useState(false);

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
  console.log(unfinished);
  return (
    <>
      <HeaderWelcome theme={selectedTheme}>welcome valaki</HeaderWelcome>
      <InfoTitle unfinished={unfinished}>{renderContent.title}</InfoTitle>
      <Info unfinished={unfinished}>
        <InfoStats theme={selectedTheme}>
          {renderContent.rows.map((item) => (
            <>
              <InfoRow>
                <InfoText>{item.title}</InfoText>
                <InfoText2>{item.value}</InfoText2>
              </InfoRow>
            </>
          ))}
        </InfoStats>
      </Info>
      <Buttons unfinished={unfinished}>
        {unfinished ? (
          <HomeButton theme={selectedTheme} text={"continue game"} />
        ) : null}
        <HomeButton
          theme={selectedTheme}
          text={"new game"}
          action={() => setUnfinished(!unfinished)}
        />
      </Buttons>
    </>
  );
};

export default HOME;
