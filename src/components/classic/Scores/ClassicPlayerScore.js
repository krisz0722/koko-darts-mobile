import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components/native/dist/styled-components.native.esm";
import {
  Animated,
  LayoutAnimation,
  NativeModules,
  Text,
  View,
} from "react-native";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { GameContext } from "../../../contexts/GameContext";
import { AlignText, FlexCol } from "../../../styles/css_mixins";
import { View_Headers } from "../../containers/Welcome";

export const ClassicPlayerScore = styled(View)`
  ${FlexCol};
  height: ${({ checkout }) => (checkout ? "50%" : "100%")};
  position: absolute;
  width: 50%;
  margin: auto;
  background-color: ${({ player, theme }) => theme.game[player + "Bg"]};
  border-width: ${({ theme }) => theme.borderWidth};
`;

export const ClassicPlayer1Score = styled(ClassicPlayerScore)`
  left: 0;
`;
export const ClassicPlayer2Score = styled(ClassicPlayerScore)`
  right: 0;
`;

export const Text_Score = styled(Text)`
  color: ${({ player, theme }) => theme.game[player + "Text"]};
  font-size: 100;
  font-family: ${({ theme }) => theme.fontFamily};
  margin: auto;
  width: 100%;
  ${AlignText};
`;

const PLAYER_SCORE = ({ player }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const {
    gameData: { activePlayer, showStats, p1_DATA, p2_DATA },
  } = useContext(GameContext);

  const { UIManager } = NativeModules;

  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
  // LayoutAnimation.linear();

  const theme = selectedTheme;
  const animation = useRef(new Animated.Value(0)).current;

  return (
    <>
      {player === "p1" ? (
        <ClassicPlayer1Score
          showStats={showStats}
          checkout={p1_DATA.onCheckout}
          ap={activePlayer}
          theme={theme}
          player={"p1"}
        >
          <Text_Score ap={activePlayer} theme={theme} player={"p1"}>
            {p1_DATA.score}
          </Text_Score>
        </ClassicPlayer1Score>
      ) : (
        <ClassicPlayer2Score
          showStats={showStats}
          checkout={p2_DATA.onCheckout}
          ap={activePlayer}
          theme={theme}
          player={"p2"}
        >
          <Text_Score ap={activePlayer} theme={theme} player={"p2"}>
            {p2_DATA.score}
          </Text_Score>
        </ClassicPlayer2Score>
      )}
    </>
  );
};

export default PLAYER_SCORE;
