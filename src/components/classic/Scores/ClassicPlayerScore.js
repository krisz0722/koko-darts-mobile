import React, { useContext } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { GameContext } from "../../../contexts/GameContext";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { Text, View } from "react-native";
import { AlignText, FlexColStart } from "../../../styles/css_mixins";

export const ClassicPlayerScore = styled(Text)`
  ${AlignText};
  position: absolute;
  top: 0;
  width: 50%;
  height: ${({ checkout }) => (checkout ? "50%" : "100%")};

  background-color: ${({ player, theme }) => theme.game[player + "Bg"]};
  color: ${({ player, theme }) => theme.game[player + "Text"]};
  font-size: 55;
  font-family: ${({ theme }) => theme.fontFamily};
  border-color: ${({ ap, theme }) => theme.game[ap + "Border"]};
  border-width: ${({ theme }) => theme.borderWidth};
  border-bottom-width: 0;
  border-top-width: 0;
`;

export const ClassicPlayer1Score = styled(ClassicPlayerScore)`
  left: 0;
`;
export const ClassicPlayer2Score = styled(ClassicPlayerScore)`
  right: 0;
`;

const PLAYER_SCORE = ({ player }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const theme = selectedTheme;

  const {
    gameData: { activePlayer, showStats, p1_DATA, p2_DATA },
  } = useContext(GameContext);

  return (
    <>
      {player === "p1" ? (
        <ClassicPlayer1Score
          checkout={p1_DATA.onCheckout}
          ap={activePlayer}
          theme={theme}
          player={"p1"}
        >
          {p1_DATA.score}
        </ClassicPlayer1Score>
      ) : (
        <ClassicPlayer2Score
          checkout={p2_DATA.onCheckout}
          ap={activePlayer}
          theme={theme}
          player={"p2"}
        >
          {p2_DATA.score}
        </ClassicPlayer2Score>
      )}
    </>
  );
};

export default PLAYER_SCORE;
