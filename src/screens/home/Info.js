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

const HOME_INFO = React.memo(({ unfinished, lastMatch }) => {
  const { theme } = useContext(ThemeContext);

  const title =
    unfinished == false ? "your last match" : "you have an unfinished match";

  console.log("LASTMATCH", lastMatch);

  const STATS = lastMatch
    ? [
        {
          stat: "result",
          value: lastMatch.result,
        },
        {
          stat: "opponent",
          value: lastMatch.opponent,
        },
        {
          stat: "match average",
          value: lastMatch.avgMatch,
        },
        {
          stat: "double percentage",
          value: lastMatch.doublePercentage,
        },
      ]
    : null;

  return (
    <>
      {!lastMatch ? (
        <>
          <InfoTitle unfinished={unfinished}>
            you haven't played a game yet
          </InfoTitle>
          <Info unfinished={unfinished}>
            <InfoStats theme={theme}>
              <FirstMatch theme={theme}>
                tap on the button below and start your first match!
              </FirstMatch>
            </InfoStats>
          </Info>
        </>
      ) : (
        <>
          <InfoTitle unfinished={unfinished}>{title}</InfoTitle>
          <Info unfinished={unfinished}>
            <InfoStats theme={theme}>
              {STATS.map((item) => (
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
