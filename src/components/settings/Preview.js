import React, { useContext } from "react";
import styled from "styled-components";
import { Animated } from "react-native";
import { FlexRow, Window } from "../../styles/css_mixins";
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
import { GameContext } from "../../contexts/GameContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { InGameThemeContext } from "../../contexts/InGameThemeContext";
import { OpacityContext } from "../../contexts/OpacityContext";
import { InGameOpacityContext } from "../../contexts/InGameOpacityContext";

const PreviewContainer = styled(Animated.View)`
  position: ${({ ingame }) => (ingame ? "relative" : "absolute")};
  top: ${({ ingame }) => (ingame ? "0" : "0%")};
  ${FlexRow};
  height: ${({ ingame }) => (ingame ? "70%" : "80%")};
  width: 100%;
  z-index: ${({ visible }) => (visible ? 1 : -1)};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  background-color: ${({ theme, ingame }) =>
    ingame ? "transparent" : theme.bgOverlay};
  border: 2px red solid;
  height: ${() => Window.height * 0.35};
`;

export const PREVIEW = ({ preview, ingame }) => {
  const {
    gameData: {
      activePlayer,
      p1,
      p2,
      p1_DATA,
      p2_DATA,
      showStats,
      inactivePlayer,
    },
  } = useContext(GameContext);

  console.log(preview);
  const { inGameTheme, inGameAnimation } = useContext(InGameThemeContext);
  const { theme, animation } = useContext(ThemeContext);
  const { opacity } = useContext(OpacityContext);
  const { inGameOpacity } = useContext(InGameOpacityContext);

  const themeToUse = ingame ? inGameTheme : theme;
  const animationToUse = ingame ? inGameAnimation : animation;
  const opacityToUse = ingame ? inGameOpacity : opacity;

  return (
    <PreviewContainer ingame={ingame} visible={preview} theme={themeToUse}>
      <GameWindow preview={preview}>
        <CLASSIC_TOP
          activePlayer={activePlayer}
          showStats={showStats}
          ingame={ingame}
          animation={animationToUse}
          theme={themeToUse}
          p1={p1}
          p2={p2}
          p1_DATA={p1_DATA}
          p2_DATA={p2_DATA}
        />
        <CLASSIC_SCORES
          activePlayer={activePlayer}
          showStats={showStats}
          ingame={ingame}
          animation={animationToUse}
          theme={themeToUse}
        />
        <CLASSIC_STATS
          activePlayer={activePlayer}
          showStats={showStats}
          ingame={ingame}
          animation={animationToUse}
          theme={themeToUse}
          p1_DATA={p1_DATA}
          p2_DATA={p2_DATA}
        />
        {opacityToUse ? (
          inactivePlayer === "p1" ? (
            <Overlay1
              ingame={ingame}
              style={{ opacity: 0.9 }}
              theme={themeToUse}
            />
          ) : (
            <Overlay2
              ingame={ingame}
              style={{ opacity: 0.9 }}
              theme={themeToUse}
            />
          )
        ) : null}
        <CLASSIC_MIDDLE
          animation={animationToUse}
          theme={themeToUse}
          ingame={ingame}
          activePlayer={activePlayer}
          inactivePlayer={inactivePlayer}
        />
        <CLASSIC_BOTTOM
          animation={animationToUse}
          theme={themeToUse}
          activePlayer={activePlayer}
        />
      </GameWindow>
    </PreviewContainer>
  );
};
export default PREVIEW;
