import styled from "styled-components";
import { View } from "react-native";
import { Window, FlexColAround } from "../../styles/css_mixins";

export const Form = styled(View)`
  width: 100%;
  padding: 0 10%;
  position: absolute;
  margin: auto;
  top: ${({ isKeyboardUp }) => (isKeyboardUp ? "0%" : "18%")};
  margin: auto;
  height: ${() => Window.height * 0.55};
`;

export const Buttons = styled(View)`
  ${FlexColAround};
  width: 100%;
  position: absolute;
  bottom: 5%;
  margin: auto;
  height: 20%;
`;
