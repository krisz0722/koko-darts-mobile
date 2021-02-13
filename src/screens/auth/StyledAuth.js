import styled from "styled-components";
import { View } from "react-native";
import {
  Window,
  FlexCol,
  FlexColStart,
  FlexColAround,
} from "../../styles/css_mixins";

export const Form = styled(View)`
  ${FlexCol}
  width: 100%;
  height: ${() => Window.height};
  margin-top: ${({ isKeyboardUp }) => (isKeyboardUp ? "-50%" : 0)};
`;

export const Form2 = styled(Form)`
  ${FlexCol};
  height: ${() => Window.height};
`;

export const Inputs = styled(View)`
  ${FlexColAround};
  width: 100%;
  height: 80%;
`;

export const Inputs2 = styled(View)`
  ${FlexColAround};
  width: 100%;
  height: 60%;
`;

export const Buttons = styled(View)`
  ${FlexColStart};
  width: 100%;
`;
