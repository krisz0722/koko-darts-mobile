import React, { useContext } from "react";
import { BottomButtons, Options, Row } from "../components/containers/Settings";
import { SettingsContext } from "../contexts/SettingsContext";
import { OptionsScore } from "../components/settings/OptionsScore";
import { OptionsLegOrSet } from "../components/settings/OptionsLegOrSet";
import SETTINGS_BUTTON_2 from "../components/settings/SettingsButton2";
import styled from "styled-components";
import Icon from "react-native-vector-icons/MaterialIcons";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import { Text, TouchableHighlight, View } from "react-native";
import {
  BasicText,
  Border,
  FlexCol,
  FlexColAround,
  FlexColBetween,
  FlexColStart,
  FlexRow,
  FlexRowAround,
  FlexRowBetween,
  Window,
} from "../styles/css_mixins";
import SETTINGS_HEADER from "../components/settings/SettingsHeader";
import ICON_DART from "../../assets/dart";

const Players = styled(View)`
  width: 100%;
  ${FlexRowAround};
  height: 25%;
`;

const PlayerInfo = styled(View)`
  width: 40%;
  height: 90%;
  border-radius: 4px;
  ${FlexColAround}
`;

const Avatar = styled(View)`
  width: ${() => Window.width * 0.3};
  height: ${() => Window.width * 0.3};
  border-radius: 4px;
  ${Border(({ theme }) => theme.text)};
`;

const Name = styled(Text)`
  color: white;
  font-size: 20;
  ${BasicText};
`;

const Swap = styled(TouchableHighlight)`
  width: 10%;
  height: ${() => Window.width * 0.1};
  background-color: ${({ theme }) => theme.bgActive};
  border-radius: 4px;
  ${FlexCol};
`;

const SwapText = styled(Text)`
  height: 100%;
  ${BasicText};
  color: ${({ theme }) => theme.text2};
  font-family: ${({ theme }) => theme.fontFamilyBold};
`;

const History = styled(View)`
  ${FlexColAround};
  height: 18%;
  width: 100%;
`;

const HistoryRow = styled(View)`
  width: 100%;
  ${FlexRow};
`;

const Data = styled(Text)`
  width: ${() => Window.width / 3};
  color: ${({ theme }) => theme.text};
  ${BasicText}
`;

const PREGAME_SETTINGS = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  return (
    <>
      <Players>
        <PlayerInfo>
          <Avatar />
          <Name>Esmeralda</Name>
        </PlayerInfo>
        <Swap>
          <Icon name={"sync"} size={20} />
        </Swap>
        <PlayerInfo>
          <Avatar />
          <Name>Jose Armando</Name>
        </PlayerInfo>
      </Players>
      <OptionsScore />
      <OptionsLegOrSet />
      <Row header={true}>
        <SETTINGS_HEADER
          header={true}
          text={"history"}
          action={() => console.log("action")}
        />
      </Row>
      <History>
        <HistoryRow>
          <Data>1</Data>
          <Data>total wins</Data>
          <Data>45</Data>
        </HistoryRow>
        <HistoryRow>
          <Data>1</Data>
          <Data>total wins</Data>
          <Data>45</Data>
        </HistoryRow>
        <HistoryRow>
          <Data>1</Data>
          <Data>total wins</Data>
          <Data>45</Data>
        </HistoryRow>
      </History>
      <BottomButtons theme={selectedTheme}>
        <SETTINGS_BUTTON_2 icon={"arrow-back"} value={"back"} />
        <SETTINGS_BUTTON_2 icon={"dart"} value={"game on!"} />
      </BottomButtons>
    </>
  );
};

export default PREGAME_SETTINGS;
