import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import GAME_CLASSIC from "../gamewindow/Classic";
import { PreviewContainer } from "./home/StyledSettings";

export const PREVIEW = React.memo((props) => {
  const { animation, theme, preview, ingame, settings } = props;

  const { opacity } = settings;

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
