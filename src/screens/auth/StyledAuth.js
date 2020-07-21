import styled from "styled-components";
import { View } from "react-native";
import {
  Window,
  FlexColAround,
  FlexColBetween,
  FlexCol,
  FlexColEnd,
  FlexColStart,
} from "../../styles/css_mixins";

export const Form = styled(View)`
  ${FlexColEnd}
  width: 100%;
  height: ${() => Window.height};
`;

export const Form2 = styled(Form)`
  ${FlexCol}
`;

export const Inputs = styled(View)`
  ${FlexColEnd};
  height: 60%;
  width: 100%;
`;

export const Buttons = styled(View)`
  ${FlexColStart};
  width: 100%;
  height: 25%;
`;

// TODO positioning issue on real mobile device
