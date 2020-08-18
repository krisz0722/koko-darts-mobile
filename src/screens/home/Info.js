import React, { useContext } from "react";
import {
  Info,
  FirstMatch,
  InfoTitle,
  InfoRow,
  InfoText,
  InfoText2,
  InfoStats,
} from "./StyledHome";
import { ThemeContext } from "../../contexts/ThemeContext";

const HOME_INFO = React.memo(({ lastMatch, username }) => {
  const { theme } = useContext(ThemeContext);
  const status = lastMatch ? lastMatch.status : null;
  const STATS = () => {
    const { p1_DATA, p2_DATA, opponent, date, status } = lastMatch;
    const p1 = status === "finished" ? lastMatch.p1 : lastMatch.settings.p1;
    const legOrSet =
      status === "finished"
        ? lastMatch.matchSummary.legOrSet
        : lastMatch.settings.legOrSet;

    const userData = p1.key === username ? p1_DATA : p2_DATA;

    const opponentData = p1.key === username ? p2_DATA : p1_DATA;
    const standing =
      legOrSet === "set"
        ? `(${userData.legsWon}) ${userData.setsWon} - ${opponentData.setsWon} (${opponentData.legsWon})`
        : `${userData.legsWon} - ${opponentData.legsWon}`;

    return lastMatch && status === "pending"
      ? [
          {
            stat: "started",
            value: date,
          },
          {
            stat: "opponent",
            value: opponent,
          },
          {
            stat: "match standing",
            value: standing,
          },
          {
            stat: "match average",
            value: userData.avgMatch,
          },
        ]
      : lastMatch && status === "finished"
      ? [
          {
            stat: "result",
            value: lastMatch.matchSummary.result,
          },
          {
            stat: "opponent",
            value: opponent,
          },
          {
            stat: "match average",
            value: userData.avgMatch,
          },
          {
            stat: "double percentage",
            value: userData.doublePercentage,
          },
        ]
      : null;
  };

  const title =
    status === "finished" ? "your last match" : "you have an unfinished match";

  return (
    <>
      {!lastMatch ? (
        <>
          <InfoTitle unfinished={status === "pending"}>
            you haven't played a game yet
          </InfoTitle>
          <Info unfinished={status === "pending"}>
            <InfoStats theme={theme}>
              <FirstMatch theme={theme}>
                tap on the button below and start your first match!
              </FirstMatch>
            </InfoStats>
          </Info>
        </>
      ) : (
        <>
          <InfoTitle unfinished={status === "pending"}>{title}</InfoTitle>
          <Info unfinished={status === "pending"}>
            <InfoStats theme={theme}>
              {STATS().map((item) => (
                <React.Fragment key={item}>
                  <InfoRow>
                    <InfoText>{item.stat}</InfoText>
                    <InfoText2>{item.value}</InfoText2>
                  </InfoRow>
                </React.Fragment>
              ))}
            </InfoStats>
          </Info>
        </>
      )}
    </>
  );
});
export default HOME_INFO;
