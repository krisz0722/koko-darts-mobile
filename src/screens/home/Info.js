import React, { useEffect, useState, useContext } from "react";
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

const HOME_INFO = React.memo(({ unfinishedMatches, matches, username }) => {
  const { theme } = useContext(ThemeContext);

  const [lastMatch, setLastMatch] = useState(null);

  useEffect(() => {
    if (matches.length > 0) {
      setLastMatch(matches[0]);
    }
  }, [matches]);

  const STATS = () => {
    if (lastMatch) {
      const { p1_DATA, p2_DATA, opponent, date, status } = lastMatch;
      const p1 = status === "finished" ? lastMatch.p1 : lastMatch.settings.p1;

      const userData = p1.key === username ? p1_DATA : p2_DATA;

      return [
        { stat: "date", value: date },
        {
          stat: "opponent",
          value: opponent,
        },
        {
          stat: "result",
          value: `${
            lastMatch.matchSummary.wonOrLost === "W" ? "Won" : "Lost"
          } by ${lastMatch.matchSummary.result}`,
        },

        {
          stat: "match average",
          value: userData.avgMatch.toFixed(1),
        },
        {
          stat: "double percentage",
          value: userData.doublePercentage,
        },
      ];
    } else {
      return null;
    }
  };

  return (
    <>
      {!lastMatch ? (
        <>
          <InfoTitle unfinished={true}>you haven't played a game yet</InfoTitle>
          <Info>
            <InfoStats theme={theme}>
              <FirstMatch theme={theme}>
                tap on the button below and start your first match!
              </FirstMatch>
            </InfoStats>
          </Info>
        </>
      ) : (
        <>
          <InfoTitle unfinished={true}>{"your last match"}</InfoTitle>
          <Info unfinished={false}>
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
