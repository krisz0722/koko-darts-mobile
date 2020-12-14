import { Animated } from "react-native";
import styled from "styled-components/native";
import { FlexRow } from "../../../styles/css_mixins";

export const ClassicBottom = styled(Animated.View)`
  ${FlexRow};
  flex-wrap: wrap;
  position: absolute;
  top: 63%;
  width: 100%;
  height: 37%;
`;
