import React from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import {
  Absolute,
  FlexCol,
  FlexColStart,
  FlexRow,
} from "../../styles/css_mixins";

export const ClassicTop = styled(View)`
  ${FlexColStart};
  ${Absolute};
  width: 100%;
  height: ${({ showStats }) => (showStats ? "10%" : "15%")};
`;
export const ClassicScores = styled(View)`
  ${FlexCol};
  position: absolute;
  top: 15%;
  top: ${({ showStats }) => (showStats ? "10%" : "15%")};
  width: 100%;
  height: ${({ showStats }) => (showStats ? "25%" : "30%")};
`;

export const ClassicMiddle = styled(View)`
  ${FlexRow};
  z-index: -1;
  position: absolute;
  flex-wrap: wrap;
  top: 45%;
  width: 100%;
  height: 18%;
`;

export const ClassicBottom = styled(View)`
  ${FlexRow};
  flex-wrap: wrap;
  position: absolute;
  top: 63%;
  width: 100%;
  height: 37%;
`;
