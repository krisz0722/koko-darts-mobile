import React, { useContext, useEffect, useRef, useState } from "react";
import { Row } from "../../screens/settings/StyledSettings";
import SETTINGS_HEADER from "./SettingsHeader";
import styled from "styled-components";
import { Animated, Text, View } from "react-native";
import {
  BasicTextBold,
  FlexColAround,
  FlexRow,
  Window,
} from "../../styles/css_mixins";
import GAME_CLASSIC from "../../screens/gamewindow/Classic";
import { SettingsContext } from "../../contexts/SettingsContext";

const PreviewContainer = styled(Animated.View)`
  position: absolute;
  top: 42%;
  ${FlexRow};
  height: 35%;
  width: 100%;
  z-index: ${({ layer }) => (layer ? 1 : -1)};
  background-color: ${({ theme }) => theme.bgOverlay};
`;

export const PREVIEW = ({ preview }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const animation = useRef(
    new Animated.Value(selectedTheme.name === "default" ? 0 : 1),
  ).current;

  const [layer, setLayer] = useState(false);

  useEffect(() => {
    if (preview) {
      setLayer(true);
      Animated.timing(animation, {
        toValue: preview ? 1 : 0,
        duration: 3000,
      }).start();
    } else {
      setTimeout(() => {
        setLayer(false);
      }, 3000);
    }
  }, [animation, selectedTheme.name, preview]);

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <PreviewContainer
      layer={layer}
      visible={preview}
      theme={selectedTheme}
      style={{
        opacity,
      }}
    >
      <GAME_CLASSIC visible={preview} layer={layer} />
    </PreviewContainer>
  );
};
export default PREVIEW;
