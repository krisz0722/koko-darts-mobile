import styled from "styled-components";
import { View } from "react-native";
import {
  Window,
  FlexCol,
  FlexColStart,
  FlexColBetween,
} from "../../styles/css_mixins";

export const Form = styled(View)`
  ${FlexCol};
  justify-content: ${({ isKeyboardUp }) =>
    isKeyboardUp ? "flex-start" : "center"};
  padding: 0 10%;
  height: ${() => Window.height * 0.9};
  width: 100%;
  background-color: transparent;
  border: 2px red solid;
`;

export const Inputs = styled(View)`
  ${FlexColBetween};
  width: 100%;
  height: ${() => Window.height * 0.55};
  border: 2px blue solid;
  padding-bottom: 5%;
`;
