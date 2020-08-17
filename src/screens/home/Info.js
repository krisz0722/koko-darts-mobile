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

const HOME_INFO = React.memo(({ unfinished, lastMatch, username }) => {
  const { theme } = useContext(ThemeContext);

  const STATS = () => {
    const { p1, p1_DATA, p2_DATA, opponent, date } = lastMatch;

    const userData = p1.key === username ? p1_DATA : p2_DATA;

    return lastMatch && unfinished
      ? [
          {
            stat: "last palyed on:",
            value: date,
          },
          {
            stat: "opponent",
            value: opponent,
          },
          {
            stat: "match standing",
            value: "3-2",
          },
          {
            stat: "match average",
            value: userData.avgMatch,
          },
        ]
      : lastMatch && !unfinished
      ? [
          {
            stat: "result",
            value: lastMatch.result,
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
    unfinished == false ? "your last match" : "you have an unfinished match";

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
