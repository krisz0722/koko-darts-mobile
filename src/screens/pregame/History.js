import React, { useContext } from "react";
import { Row2 } from "../settings/StyledSettings";
import SETTINGS_HEADER from "../settings/Header";
import styled from "styled-components";
import { Text, View } from "react-native";
import {
  BasicTextBold,
  FlexColAround,
  FlexRow,
  Window,
} from "../../styles/css_mixins";
import { Authcontext } from "../../contexts/AuthContext";

const RowMod = styled(Row2)``;

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
  font-size: ${({ theme }) => theme.settings.fontSizeButton2};
  ${BasicTextBold};
`;

const HISTORY_ROW = ({ p1, title, p2 }) => (
  <HistoryRow>
    <Data>{p1}</Data>
    <Data>{title}</Data>
    <Data>{p2}</Data>
  </HistoryRow>
);

export const HISTORY = ({ p1, p2 }) => {
  const {
    userData: { username },
  } = useContext(Authcontext);

  const DATA = [
    {
      p1: username === p1.key ? p2.losses : p1.wins,
      title: "total wins",
      p2: username === p1.key ? p2.wins : p1.losses,
    },
    {
      p1: p1.overallAvg,
      title: "overall average",
      p2: p2.overallAvg,
    },
    {
      p1: p1.bestMatch,
      title: "best match",
      p2: p2.bestMatch,
    },
  ];

  return (
    <>
      <RowMod header={true}>
        <SETTINGS_HEADER
          header={true}
          text={"history"}
          action={() => alert("action")}
        />
      </RowMod>
      <HistoryContainer>
        {p2 ? (
          <>
            {DATA.map((item) => (
              <HISTORY_ROW
                key={item.title}
                p1={item.p1}
                p2={item.p2}
                title={item.title}
              />
            ))}
          </>
        ) : null}
      </HistoryContainer>
    </>
  );
};

export default HISTORY;
