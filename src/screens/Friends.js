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

const FRIENDS = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  return <HeaderWelcome theme={selectedTheme}>FRIENDS</HeaderWelcome>;
};

export default FRIENDS;
