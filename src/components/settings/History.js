import React from "react";
import { Row } from "../../screens/settings/StyledSettings";
import SETTINGS_HEADER from "./SettingsHeader";
import styled from "styled-components";
import { Text, View } from "react-native";
import {
  BasicTextBold,
  FlexColAround,
  FlexRow,
  Window,
} from "../../styles/css_mixins";

const HistoryContainer = styled(View)`
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
  ${BasicTextBold}
`;

const HISTORY_ROW = ({ p1, title, p2 }) => (
  <HistoryRow>
    <Data>{p1}</Data>
    <Data>{title}</Data>
    <Data>{p2}</Data>
  </HistoryRow>
);

export const HISTORY = () => {
  const DATA = [
    {
      p1: 45,
      title: "total wins",
      p2: 36,
    },
    {
      p1: 65.2,
      title: "overall average",
      p2: 112.2,
    },
    {
      p1: 120.2,
      title: "best match",
      p2: 75.2,
    },
  ];

  return (
    <>
      <Row header={true}>
        <SETTINGS_HEADER
          header={true}
          text={"history"}
          action={() => alert("action")}
        />
      </Row>
      <HistoryContainer>
        {DATA.map((item) => (
          <HISTORY_ROW
            key={item.title}
            p1={item.p1}
            p2={item.p2}
            title={item.title}
          />
        ))}
      </HistoryContainer>
    </>
  );
};

export default HISTORY;
