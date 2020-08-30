import { View } from "react-native";

import styled from "styled-components";
import { FlexRowAround, AlignText } from "../../../styles/css_mixins";
import { P2 } from "../../headers/StyledHeaders";

export const Checkout_Row = styled(View)`
  width: 100%;
  height: 100%;
  ${FlexRowAround};
`;

export const Checkout_Text = styled(P2)`
  ${AlignText};
  width: ${() => 100 / 3 + "%"};
`;
