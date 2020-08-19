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
    userData: { username, friends },
  } = useContext(Authcontext);

  const DATA = () => {
    if (p2.key !== "") {
      const data =
        username === p1.key
          ? friends.find((item) => item.key === p2.key)
          : friends.find((item) => item.key === p1.key);

      let {
        winsAgainst,
        lossesAgainst,
        avgAgainst,
        avgFriend,
        bestMatchAgainst,
        bestMatchFriend,
      } = data;

      winsAgainst = winsAgainst.toFixed();
      lossesAgainst = lossesAgainst.toFixed();
      avgAgainst = avgAgainst.toFixed(1);
      avgFriend = avgFriend.toFixed(1);
      bestMatchAgainst = bestMatchAgainst.toFixed(1);
      bestMatchFriend = bestMatchFriend.toFixed(1);

      return [
        {
          p1: username === p1.key ? winsAgainst : lossesAgainst,
          title: "matches won",
          p2: username === p2.key ? winsAgainst : lossesAgainst,
        },
        {
          p1: username === p1.key ? avgAgainst : avgFriend,
          title: "overall average",
          p2: username === p2.key ? avgAgainst : avgFriend,
        },
        {
          p1: username === p1.key ? bestMatchAgainst : bestMatchFriend,
          title: "best match",
          p2: username === p2.key ? bestMatchAgainst : bestMatchFriend,
        },
      ];
    } else {
      return null;
    }
  };

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
        {p2.key !== "" ? (
          <>
            {DATA().map((item) => (
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
