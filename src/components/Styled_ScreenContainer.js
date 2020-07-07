import React from "react";
import styled from "styled-components/native";
import { Image, View } from "react-native";
import { FlexRow } from "../themes/css_mixins";
import { Absolute } from "../themes/css_mixins";

export const AppContainer = styled(View)`
  width: 100%;
  height: 100%;
  ${Absolute};
`;

export const AppBackground = styled(Image)`
  width: 100%;
  height: 100%;
  ${Absolute};
`;

export const ScreenContainer = styled(View)`
  ${FlexRow};
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.bgOverlay};
  color: red;
`;
