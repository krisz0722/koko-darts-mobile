import React, { useEffect, useState, useContext } from "react";
import {
  Info,
  FirstMatch,
  InfoRow,
  InfoText,
  InfoText2,
  InfoStats,
  HeaderCon,
} from "./StyledInfo";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Header2 } from "../../components/headers/StyledHeaders";

const HOME_INFO = React.memo(({ matches, username }) => {
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
          value: opponent.key,
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
          <HeaderCon theme={theme}>
            <Header2 unfinished={true}>you haven't played a game yet</Header2>
          </HeaderCon>
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
          <HeaderCon theme={theme}>
            <Header2 unfinished={true}>{"your last match"}</Header2>
          </HeaderCon>

          <Info unfinished={false}>
            <InfoStats theme={theme}>
              {STATS().map((item, i) => (
                <InfoRow key={i}>
                  <InfoText theme={theme}>{item.stat}</InfoText>
                  <InfoText2>{item.value}</InfoText2>
                </InfoRow>
              ))}
            </InfoStats>
          </Info>
        </>
      )}
    </>
  );
});
export default HOME_INFO;
