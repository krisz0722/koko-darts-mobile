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
  z-index: ${({ visible }) => (visible ? 1 : -1)};
  background-color: ${({ theme }) => theme.bgOverlay};
`;

export const PREVIEW = ({ preview }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  return (
    <PreviewContainer visible={preview} theme={selectedTheme}>
      <GAME_CLASSIC preview={preview} />
    </PreviewContainer>
  );
};
export default PREVIEW;
