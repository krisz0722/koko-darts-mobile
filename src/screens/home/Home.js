import React, { useContext, useState } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import {
  Info,
  HeaderWelcome,
  InfoTitle,
  InfoRow,
  InfoText,
  InfoText2,
  InfoStats,
} from "./StyledHome";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";

const HOME = ({ navigation }) => {
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
      {unfinished ? (
        <THEMED_BUTTON
          type={"success"}
          theme={selectedTheme}
          text={"continue game"}
        />
      ) : null}
      <THEMED_BUTTON
        valami={1}
        type={"success"}
        theme={selectedTheme}
        text={"new game"}
        action={() => navigation.navigate("pregame")}
      />
    </>
  );
};

export default HOME;
