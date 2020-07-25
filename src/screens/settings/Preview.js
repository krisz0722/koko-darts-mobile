import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { Animated } from "react-native";
import { FlexRow } from "../../styles/css_mixins";
import { ThemeContext } from "../../contexts/ThemeContext";
import GAME_CLASSIC from "../gamewindow/Classic";

const PreviewContainer = styled(Animated.View)`
  position: ${({ ingame }) => (ingame ? "relative" : "absolute")};
  top: ${({ ingame }) => (ingame ? "0" : "0%")};
  ${FlexRow};
  height: ${({ ingame }) => (ingame ? "70%" : "70%")};
  width: 100%;
  z-index: ${({ visible }) => (visible ? 3 : -1)};
  background-color: ${({ theme, ingame }) =>
    ingame ? "transparent" : theme.bgOverlay};
  border: 2px red solid;
`;

export const PREVIEW = React.memo((props) => {
  const { preview, ingame, opacity, animation } = props;

  const settings = props;

  console.log("SETTINGS", settings);

  const { theme } = useContext(ThemeContext);

  console.log("RENDER PREVIEW");

  const animationValue = useRef(new Animated.Value(!preview ? 0 : 1)).current;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: preview ? 1 : 0,
      duration: animation ? 500 : 0,
    }).start();
  }, [animation, animationValue, preview]);

  const opacityStyle = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <PreviewContainer
      style={{ opacity: opacityStyle }}
      ingame={ingame}
      visible={preview}
      theme={theme}
    >
      <GAME_CLASSIC
        opacitySettings={opacity}
        ingame={ingame}
        preview={true}
        settings={settings}
      />
    </PreviewContainer>
  );
});
export default PREVIEW;