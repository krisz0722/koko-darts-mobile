import styled from "styled-components/native/dist/styled-components.native.esm";
import { Animated } from "react-native";
import { FlexColAround } from "../../../styles/css_mixins";

export const ClassicScores = styled(Animated.View)`
  ${FlexColAround};
  position: absolute;
  top: ${({ showStats }) => (showStats ? "10%" : "15%")};
  width: 100%;
  height: ${({ showStats }) => (showStats ? "25%" : "30%")};
`;

export const ClassicCheckoutsPlayer = styled(Animated.View)`
  position: absolute;
  width: 50%;
  bottom: 0;
  height: 50%;
  ${FlexColAround};
  background-color: ${({ theme }) => theme.game.bgOnCheckout};
  border-width: ${({ theme }) => theme.borderWidth};
`;
export const ClassicCheckoutsP1 = styled(ClassicCheckoutsPlayer)`
  left: 0;
`;

export const ClassicCheckoutsP2 = styled(ClassicCheckoutsPlayer)`
  right: 0;
`;
