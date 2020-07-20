import React, { useContext } from "react";
import styled from "styled-components";
import { Animated } from "react-native";
import { FlexRow } from "../../styles/css_mixins";
import GAME_CLASSIC from "../../screens/gamewindow/Classic";
import { SettingsContext } from "../../contexts/SettingsContext";
import CLASSIC_TOP from "../classic/Top/ClassicTop";
import CLASSIC_SCORES from "../classic/Scores/ClassicScores";
import CLASSIC_STATS from "../classic/Stats/ClassicStats";
import {
  GameWindow,
  Overlay1,
  Overlay2,
} from "../../screens/gamewindow/StyledClassic";
import CLASSIC_MIDDLE from "../classic/Middle/ClassicMiddle";
import CLASSIC_BOTTOM from "../classic/Bottom/ClassicBottom";
import LEAVE_MATCH_ALERT from "../modals/LeaveMatchAlert";
import { GameContext } from "../../contexts/GameContext";

const PreviewContainer = styled(Animated.View)`
  position: ${({ ingame }) => (ingame ? "relative" : "absolute")};
  top: ${({ ingame }) => (ingame ? "0" : "42%")};
  ${FlexRow};
  height: ${({ ingame }) => (ingame ? "40%" : "35%")};
  width: 100%;
  z-index: ${({ visible }) => (visible ? 1 : -1)};
  background-color: ${({ theme, ingame }) =>
    ingame ? "transparent" : theme.bgOverlay};
`;

export const PREVIEW = ({ preview, ingame }) => {
  const {
    gameData: { inactivePlayer },
  } = useContext(GameContext);

  const {
    settings: { selectedTheme, opacity },
  } = useContext(SettingsContext);

  return (
    <PreviewContainer ingame={ingame} visible={preview} theme={selectedTheme}>
      <GameWindow preview={preview}>
        <CLASSIC_TOP />
        <CLASSIC_SCORES />
        <CLASSIC_STATS />
        {opacity ? (
          inactivePlayer === "p1" ? (
            <Overlay1 style={{ opacity: 0.9 }} theme={selectedTheme} />
          ) : (
            <Overlay2 style={{ opacity: 0.9 }} theme={selectedTheme} />
          )
        ) : null}
        <CLASSIC_MIDDLE />
        <CLASSIC_BOTTOM />
      </GameWindow>
    </PreviewContainer>
  );
};
export default PREVIEW;
