import React, { useContext, useState } from "react";
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

const HOME = ({ navigation }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const [unfinished, setUnfinished] = useState(true);

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
      <Header>
        <HeaderText theme={selectedTheme}>welcome</HeaderText>
        <HeaderText theme={selectedTheme}>valaki</HeaderText>
      </Header>
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
          action={() => navigation.navigate("pregame")}
        />
      </Buttons>
    </>
  );
};

export default HOME;
