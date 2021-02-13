import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import {
  Match,
  Name,
  Result1,
  MatchAvg,
  MatchDate,
  Result2,
} from "./StyledComponentMatch";

const MATCH_COMPONENT = ({ item }) => {
  const { theme } = useContext(ThemeContext);
  const gameData = item.item;
  const matchSummary = gameData.matchSummary;

  const navigation = useNavigation();

  const { date, opponent, avg, result, wonOrLost } = matchSummary;

  const openMatchStats = () =>
    navigation.navigate("homenavigator", {
      screen: "stats_saved",
      params: { gameData, theme, back: "profile" },
    });

  return (
    <Match theme={theme} onPress={openMatchStats}>
      <MatchDate theme={theme}>{date}</MatchDate>

      <Name>{opponent}</Name>
      <Result1>{result}</Result1>

      <Result2 theme={theme} result={wonOrLost}>
        {wonOrLost}
      </Result2>
      <MatchAvg theme={theme}>{avg.toFixed(1)}</MatchAvg>
    </Match>
  );
};

export default MATCH_COMPONENT;
