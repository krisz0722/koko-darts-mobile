import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import { Averages, Totals } from "../containers/ClassicPlayerStats";
import { GameContext } from "../../contexts/GameContext";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { Text, View } from "react-native";
import { FlexRowBetween } from "../../styles/css_mixins";

export const StatRow = styled(View)`
  ${FlexRowBetween};
  width: 90%;
  height: 25%;
`;

export const StatText1 = styled(Text)`
  text-align: left;
  width: 80%;
  color: ${({ theme, player }) => theme.game[player + "Text"]};
  font-size: 8;
  font-family: ${({ theme }) => theme.fontFamilyBold};
  text-transform: uppercase;
`;

export const StatText2 = styled(StatText1)`
  width: 20%;
  text-align: right;
`;

export const StatText3 = styled(StatText1)`
  width: 50%;
`;

export const StatText4 = styled(StatText2)`
  width: 50%;
`;

const PLAYER_STATS = ({ player }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const theme = selectedTheme;

  const {
    gameData,
    gameData: { activePlayer },
  } = useContext(GameContext);

  const p = gameData[player + "_DATA"];

  const AVERAGES = [
    {
      name: "leg",
      value: p.legAverage,
    },
    {
      name: "match",
      value: p.matchAverage,
    },
    {
      name: "first 9",
      value: p.firstNineDartAverage,
    },
    {
      name: "scoring",
      value: p.scoringDartsAverage,
    },
  ];
  const TOTALS = [
    {
      name: "60+",
      value: p["60"],
    },
    {
      name: "100+",
      value: p["100"],
    },
    {
      name: "140+",
      value: p["140"],
    },
    {
      name: "180",
      value: p["180"],
    },
  ];

  return (
    <>
      <Averages ap={activePlayer} player={player} theme={theme}>
        {AVERAGES.map((item) => (
          <StatRow>
            <StatText1 player={player} theme={theme}>
              {item.name + " average"}
            </StatText1>
            <StatText2 player={player} theme={theme}>
              {170.2}
            </StatText2>
          </StatRow>
        ))}
      </Averages>
      <Totals ap={activePlayer} player={player} theme={theme}>
        {TOTALS.map((item) => (
          <StatRow>
            <StatText3 player={player} theme={theme}>
              {item.name}
            </StatText3>
            <StatText4 player={player} theme={theme}>
              {item.value}
            </StatText4>
          </StatRow>
        ))}
      </Totals>
    </>
  );
};

export default PLAYER_STATS;
