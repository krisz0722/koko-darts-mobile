import React, { useContext } from "react";
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

const HOME = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  return (
    <>
      <HeaderWelcome theme={selectedTheme}>welcome valaki</HeaderWelcome>
      <Info>
        <InfoTitle>Your Last Match:</InfoTitle>
        <InfoStats theme={selectedTheme}>
          <InfoRow>
            <InfoText>result:</InfoText>
            <InfoText2>3-2 (WON)</InfoText2>
          </InfoRow>
          <InfoRow>
            <InfoText>opponent:</InfoText>
            <InfoText2>Mustang</InfoText2>
          </InfoRow>
          <InfoRow>
            <InfoText>match average:</InfoText>
            <InfoText2>105.6</InfoText2>
          </InfoRow>
          <InfoRow>
            <InfoText>best leg average:</InfoText>
            <InfoText2>110.6</InfoText2>
          </InfoRow>
        </InfoStats>
      </Info>
      <Buttons theme={selectedTheme}>
        <HomeButton
          theme={selectedTheme}
          text={"continue game"}
          action={() => console.log("continue game")}
        />
        <HomeButton
          theme={selectedTheme}
          text={"new game"}
          action={() => console.log("newgame")}
        />
      </Buttons>
    </>
  );
};

export default HOME;
