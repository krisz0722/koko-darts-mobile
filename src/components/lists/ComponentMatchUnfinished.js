import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Icon from "react-native-vector-icons/MaterialIcons";
import deleteMatch from "../../contexts/actions/authContext/DeleteUnfinishedMatch";
import {
  Match,
  MatchDate,
  MatchAvg,
  Name,
  ClearButton,
  Data,
} from "./StyledComponentMatchUnfinished";

const UNFINISHED_MATCH_COMPONENT = ({
  active,
  handleGameToContinue,
  username,
  item,
}) => {
  const { theme } = useContext(ThemeContext);
  const gameData = item.item;

  const {
    date,
    opponent,
    settings: { p1, legOrSet },
    p1_DATA,
    p2_DATA,
  } = gameData;
  const userData = username === p1.key ? p1_DATA : p2_DATA;
  const opponentData = username === p1.key ? p2_DATA : p1_DATA;
  const avg = userData.avgMatch;
  const legs = `${userData.legsWon} - ${opponentData.legsWon}`;
  const sets = `${userData.setsWon} - ${opponentData.setsWon}`;

  const setGameToContinue = async () => {
    const gameToContinue = { ...gameData, initializedBy: username };
    handleGameToContinue(gameToContinue);
  };

  const deleteUnfinishedMatch = async () => {
    await deleteMatch(gameData, username, null, null, null);
  };

  return (
    <Match
      active={active}
      theme={theme}
      onPress={() =>
        setGameToContinue({ ...gameData, initializedBy: username })
      }
    >
      <MatchDate active={active} theme={theme}>
        {date}
      </MatchDate>
      <Name active={active}>{`vs. ${opponent}`}</Name>
      {legOrSet === "set" ? (
        <>
          <Data theme={theme} active={active}>
            {"sets"}
          </Data>
          <Data theme={theme} active={active}>
            {sets}
          </Data>
        </>
      ) : (
        <>
          <Data theme={theme} active={active}>
            {"legs"}
          </Data>
          <Data theme={theme} active={active}>
            {legs}
          </Data>
        </>
      )}

      <MatchAvg active={active} theme={theme}>{`avg: ${avg.toFixed(
        1,
      )}`}</MatchAvg>
      <ClearButton theme={theme} onPress={() => deleteUnfinishedMatch()}>
        <Icon name={"clear"} size={theme.fonts.icon2} color={theme.text} />
      </ClearButton>
    </Match>
  );
};

export default UNFINISHED_MATCH_COMPONENT;
