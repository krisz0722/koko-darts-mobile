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
import { Authcontext } from "../../contexts/AuthContext";

const UNFINISHED_MATCH_COMPONENT = ({
  active,
  handleGameToContinue,
  unfinishedMatch,
}) => {
  const { theme } = useContext(ThemeContext);

  const {
    dispatchUserData,
    userData: { id },
  } = useContext(Authcontext);
  const gameData = unfinishedMatch;

  const {
    date,
    opponent,
    settings: { p1, legOrSet },
    p1_DATA,
    p2_DATA,
  } = gameData;
  const userData = id === p1.id ? p1_DATA : p2_DATA;
  const opponentData = id === p1.id ? p2_DATA : p1_DATA;
  const avg = userData.avgMatch;
  const legs = `${userData.legsWon} - ${opponentData.legsWon}`;
  const sets = `${userData.setsWon} - ${opponentData.setsWon}`;

  const setGameToContinue = async () => {
    const gameToContinue = { ...gameData, initializedBy: id };
    handleGameToContinue(gameToContinue);
  };

  const deleteUnfinishedMatch = async () => {
    const updatesUserData = await deleteMatch(gameData, id, null, null, null);
    dispatchUserData({ type: "UPDATE_PROFILE", value: updatesUserData });
  };

  return (
    <Match
      active={active}
      theme={theme}
      onPress={() => setGameToContinue({ ...gameData, initializedBy: id })}
    >
      <MatchDate active={active} theme={theme}>
        {date}
      </MatchDate>
      <Name active={active}>{`vs. ${opponent.key}`}</Name>
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
